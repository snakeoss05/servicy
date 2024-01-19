import serviceDao from "../dao/serviceDao.js";
import path from "path";
import userDao from "../dao/userDao.js";
export default class serviceController {
  static async getUsersByServiceName(req, res) {
    const { name } = req.params;
    const result = await serviceDao.getUsersServiceByName(name);
    res.json(result.rows);
  }
  static async CreateService(req, res) {
    const { userid, name, city, address, phonenumber, category } = req.body;
    const file = req.file;
    let fieldsToUpdate = {};

    if (!file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }
    const filePath = file.path;
    const img1 = filePath.replace(/\\/g, "/");
    fieldsToUpdate.image1 = `'${req.protocol}://${req.get("host")}/${img1}'`;
    if (!name) {
      return res.json({ message: "رجاء أختيار أسم الخدمة" });
    }
    fieldsToUpdate.name = `'${name}'`;
    if (!city) {
      return res.json({ message: "الرجاء أختيار مدينة" });
    }
    fieldsToUpdate.city = `'${city}'`;
    if (!address) {
      return res.json({ message: "الرجاء أختيار عنوان" });
    }
    fieldsToUpdate.address = `'${address}'`;
    if (!phonenumber) {
      return res.json({ message: "الرجاء أدخال رقم الهاتف" });
    }
    fieldsToUpdate.phonenumber = `${phonenumber}`;
    if (!category) {
      return res.json("الرجاء أختيار تصنيف الخدمة");
    }
    fieldsToUpdate.category = `'${category}'`;
    fieldsToUpdate.userid = `${userid}`;
    const result = await serviceDao.CreateUserSer(fieldsToUpdate, userid);

    res.json(result);
  }
  static async updateService(req, res) {
    const { userid, name, city, address, phonenumber, category } = req.body;
    const picture = req.file;
    let fieldsToUpdate = [];

    if (name) {
      fieldsToUpdate.push(`name = '${name}'`);
    }
    if (city) {
      fieldsToUpdate.push(`city = '${city}'`);
    }
    if (address) {
      fieldsToUpdate.push(`address ='${address}'`);
    }
    if (phonenumber) {
      fieldsToUpdate.push(`phonenumber ='${phonenumber}'`);
    }
    if (category) {
      fieldsToUpdate.push(`category ='${category}'`);
    }

    if (picture) {
      const filePath = picture.path;
      const img1 = filePath.replace(/\\/g, "/");
      fieldsToUpdate.push(
        `image1 = '${req.protocol}://${req.get("host")}/${img1}'`
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
      await serviceController.updateService(fieldsToUpdate, userid);
      const updatedValues = convertArrayToObject(fieldsToUpdate);

      return res.status(200).json(updatedValues);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error.");
    }
  }
  static async addReview(req, res) {
    const { userid, serviceid, rating, comment, ratedid } = req.body;

    const result = await serviceDao.addReview(
      userid,
      serviceid,
      rating,
      comment,
      ratedid
    );
    const results2 = await serviceDao.getRaterid(userid);

    const notification = {
      notificationid: Date.now() + serviceid,
      firstname: results2[0].firstname,
      lastname: results2[0].lastname,
      profileimg: results2[0].profileimg,
      created_at: new Date(),
      message: comment,
    };
    serviceDao.sendNotificationToUser(ratedid, notification);
    res.json(result.message);
  }
  static async getServiceById(req, res) {
    const { userid } = req.params;
    const result = await serviceDao.getServiceById(userid);
    res.status(200).json(result.rows[0]);
  }

  static async getUsersByServiceCategory(req, res) {
    const { category } = req.params;
    const result = await serviceDao.getUsersByServiceCategory(category);
    res.status(200).json(result.rows);
  }
  static async getUsersServiceFilter(req, res) {
    const { category, name, city, address, rating } = req.query;
    const result = await serviceDao.getUsersServiceFilter(
      category,
      name,
      city,
      address,
      rating
    );
    res.status(200).json(result.rows);
  }

  static async getServiceFullInfo(req, res) {
    const { userid } = req.params;
    const result = await serviceDao.getServiceFullInfo(userid);
    res.status(200).json(result.rows);
  }
  static async getReviewsForServices(req, res) {
    const { id } = req.params;
    const result = await serviceDao.getReviewsForService(id);
    res.json(result.rows);
  }
  static async getReviewsForServiceByid(req, res) {
    const { id } = req.params;
    const result = await serviceDao.getReviewsForServicebyId(id);
    res.json(result.rows);
  }
  static async getNotfications(req, res) {
    const { userid } = req.params;

    const results = await serviceDao.getNotifications(userid);
    res.json(results);
  }
  static async deleteNotification(req, res) {
    const { notificationid, userid } = req.query;

    try {
      const result = await serviceDao.deleteNotifications(
        notificationid,
        userid
      );

      if (result) {
        res.json({ message: "Notification deleted", success: true });
      } else {
        res.status(404).json({
          message: "Notification not found or user mismatch",
          success: false,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
  static async addReaction(req, res) {
    const { report, heart, reviewid, user, userid } = req.body;

    let fieldsToUpdate = {};
    if (!reviewid) {
      return;
    }
    if (report) {
      fieldsToUpdate.report = `report = ${report}`;
    }
    if (heart) {
      fieldsToUpdate.heart = `heart = ${heart}`;
    } else {
      return;
    }
    const notification = {
      notificationid: Date.now() + reviewid,
      firstname: user.firstname,
      lastname: user.lastname,
      profileimg: user.profileimg,
      created_at: Date.now(),
      message: `❤︎`,
    };
    try {
      const results = await serviceDao.addReaction(fieldsToUpdate, reviewid);

      await serviceDao.sendNotificationToUser(userid, notification);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error.");
    }
  }
}
