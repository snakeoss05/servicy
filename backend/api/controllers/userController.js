import userDao from "../dao/userDao.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";

export default class UserController {
  static async registerUser(req, res) {
    const { firstname, lastname, email, password } = req.body;

    try {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await userDao.registerUser(
        firstname,
        lastname,
        email,
        hashedPassword
      );

      return res.status(200).json(result.message);
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  }
  static async loginUser(req, res) {
    const { email, password } = req.body;
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;

    const user = await userDao.findUserByEmail(email);

    try {
      if (!user) {
        return res.status(404).send("Email not registered.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).send("Wrong password.");
      }

      const token = jwt.sign({ userid: user.userid }, secretOrPrivateKey);

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send("Internal server error.");
    }
  }

  static async updateUserState(req, res) {
    const { firstname, lastname, email, password, id } = req.body;
    const picture = req.file;
    let fieldsToUpdate = [];

    if (firstname) {
      fieldsToUpdate.push(`firstname = '${firstname}'`);
    }
    if (lastname) {
      fieldsToUpdate.push(`lastname = '${lastname}'`);
    }
    if (email) {
      fieldsToUpdate.push(`email ='${email}'`);
    }
    if (password) {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      fieldsToUpdate.push(`password = '${hashedPassword}'`);
    }
    if (picture) {
      const filePath = picture.path;
      const img1 = filePath.replace(/\\/g, "/");
      fieldsToUpdate.push(
        `profileimg = '${req.protocol}://${req.get("host")}/${img1}'`
      );
    }
    if (fieldsToUpdate.length === 0) {
      return res.status(400).send({ message: "No fields to update" });
    }

    const convertArrayToObject = (array) => {
      const obj = {};
      array.forEach((item) => {
        const [key, value] = item.split(" = ");

        obj[key] = value?.replace(/^'(.+)'$/, "$1");
      });
      return obj;
    };
    try {
      await userDao.updateUser(fieldsToUpdate, id);
      const updatedValues = convertArrayToObject(fieldsToUpdate);

      return res.status(200).json(updatedValues);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error.");
    }
  }

  static async authenticateToken(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userid = decodedToken.userid;
      const user = await userDao.getUserById(userid);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
  static async getUserByService(req, res) {
    const { serviceid } = req.params;

    const result = await userDao.getUserByService(serviceid);
    res.status(200).json(result);
  }
}
