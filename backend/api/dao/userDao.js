import db from "../config/db.js"; // Import your database connection object

export default class userDao {
  static async findUserByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
  static async getUserById(userid) {
    return await db.query("SELECT * FROM users WHERE userid = $1", [userid]);
  }

  static async registerUser(firstname, lastname, email, hashedPassword) {
    try {
      await db.query(
        "INSERT INTO users (firstname,lastname, email,password) VALUES($1,$2,$3,$4) RETURNING *",
        [firstname, lastname, email, hashedPassword]
      );

      return { success: true, message: "User registered successfully" };
    } catch (error) {
      if (
        error.code === "23505" &&
        error.constraint === "userregistration_email_key"
      ) {
        return {
          success: false,
          message: "Email address is already registered.",
        };
      } else {
        // Handle other types of errors
        console.error("Error during user registration:", error);
        return {
          success: false,
          message: "An error occurred during registration.",
        };
      }
    }
  }
  static async getUserByService(serviceid) {
    return await db.query(
      "SELECT services.*,users.firstname,users.lastname FROM services JOIN users ON services.userid = users.userid WHERE serviceid=$1",
      [serviceid]
    );
  }
  static async updateUser(fieldsToUpdate, id) {
    const query = `
    UPDATE users
    SET ${fieldsToUpdate.join(", ")}
    WHERE userid = ${id};
  `;

    return await db.query(query);
  }
}
