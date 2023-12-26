import db from "../config/db.js";
export default class serviceDao {
  static async CreateUserSer(fieldsToUpdate, userid) {
    try {
      const query = `
    INSERT INTO services(${Object.keys(fieldsToUpdate)})
    VALUES(${Object.values(fieldsToUpdate)})
    WHERE userid = ${userid};
  `;
      console.log(fieldsToUpdate);
      console.log(query);
      await db.query(query);
      return {
        success: true,
        message: "Your Service Have Been Posted Successfuly",
      };
    } catch (error) {
      return { success: false, message: "You can only add one service" };
    }
  }
  static async getUsersByServiceCategory(category) {
    return await db.query(
      "SELECT services.phonenumber,services.avg_rating,users.firstname,users.lastname,services.userid FROM services JOIN users ON services.userid=users.userid WHERE services.category = $1",
      [category]
    );
  }
  static async getUsersServiceFilter(name, city, address, rating) {
    let sql =
      "SELECT services.phonenumber,services.avg_rating,users.firstname,users.lastname,services.userid FROM services JOIN users ON services.userid=users.userid WHERE 1=1";
    if (city) {
      sql += ` AND services.city = '${city}'`;
    }
    if (address) {
      sql += ` OR services.address = '${address}'`;
    }

    if (name) {
      sql += ` OR services.name = '${name}'`;
    }

    if (rating) {
      sql += ` OR services.avg_rating >= ${rating}`;
    }
    return await db.query(sql);
  }
  static async getUsersServiceByCity(name) {
    return await db.query(
      "SELECT services.phonenumber,services.avg_rating,users.firstname,users.lastname,services.userid FROM services JOIN users ON services.userid=users.userid WHERE services.city = $1",
      [name]
    );
  }
  static async getUsersServiceByAdress(name) {
    return await db.query(
      "SELECT services.phonenumber,services.avg_rating,users.firstname,users.lastname,services.userid FROM services JOIN users ON services.userid=users.userid WHERE services.address = $1",
      [name]
    );
  }
  static async addReview(userid, serviceid, rating, comment) {
    try {
      await db.query(
        "INSERT INTO reviews (userid, serviceid, rating, comment, timestamp)VALUES ($1,$2,$3,$4,CURRENT_TIMESTAMP)",
        [userid, serviceid, rating, comment]
      );
      await db.query(
        "UPDATE services SET avg_rating = (SELECT AVG(rating) FROM reviews WHERE reviews.serviceid = $1) WHERE services.serviceid = $1;",
        [serviceid]
      );

      return {
        success: true,
        message: "Thanks for Rating our Service :)",
      };
    } catch (error) {
      return { success: false, message: error };
    }
  }
  static async getServiceFullInfo(userid) {
    return await db.query(
      "SELECT services.*,users.firstname,users.lastname FROM services JOIN users ON services.userid=users.userid WHERE services.userid = $1",
      [userid]
    );
  }
  static async getReviewsForService(id) {
    return await db.query(
      "SELECT users.firstname,users.lastname, reviews.rating,reviews.comment, reviews.timestamp FROM reviews JOIN users ON reviews.userid = users.userid WHERE reviews.serviceid = $1",
      [id]
    );
  }
}
