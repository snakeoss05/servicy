import db from "../config/db.js";
import { getIo, getUserSocketId } from "../../socket.js";
export default class serviceDao {
  static async CreateUserSer(fieldsToUpdate) {
    try {
      const query = `
    INSERT INTO services(${Object.keys(fieldsToUpdate)})
    VALUES(${Object.values(fieldsToUpdate)});
    
  `;

      await db.query(query);
      return {
        success: true,
        message: "Your Service Have Been Posted Successfuly",
      };
    } catch (error) {
      return { fail: error, message: "You can only add one service" };
    }
  }
  static async updateService(fieldsToUpdate, userid) {
    const query = `
    UPDATE services
    SET ${fieldsToUpdate.join(", ")}
    WHERE userid = ${userid};
  `;

    return await db.query(query);
  }
  static async getUsersByServiceCategory(category) {
    return await db.query(
      "SELECT services.*,users.firstname,users.lastname,users.profileimg FROM services JOIN users ON services.userid=users.userid WHERE services.category = $1 ",

      [category]
    );
  }

  static async getUsersServiceFilter(category, name, city, address, rating) {
    let sql = `SELECT services.*,users.firstname,users.lastname,services.userid,services.rating_count,users.profileimg FROM services JOIN users ON services.userid=users.userid WHERE services.category='${category}'`;

    if (city) {
      sql += `AND services.city = '${city}'`;
    }
    if (address) {
      sql += `AND services.address = '${address}'`;
    }

    if (name) {
      sql += `AND services.name = '${name}'`;
    }

    if (rating) {
      sql += `AND services.avg_rating >= ${rating}`;
    }

    return await db.query(sql);
  }
  static async getUsersTopService(category, name, city, address, rating) {
    let sql = `SELECT services.*,users.firstname,users.lastname,services.userid,users.profileimg FROM services JOIN users ON services.userid=users.userid WHERE category='${category} AND services.rating > 4`;

    if (city) {
      sql += `AND services.city = '${city}'`;
    }
    if (address) {
      sql += ` AND services.address = '${address}'`;
    }

    if (name) {
      sql += ` AND services.name = '${name}'`;
    }

    if (rating) {
      sql += ` AND services.avg_rating >= ${rating}`;
    }

    return await db.query(sql);
  }

  static async addReview(userid, serviceid, rating, comment, ratedid) {
    try {
      await db.query(
        "INSERT INTO reviews (userid, serviceid, rating, comment, timestamp)VALUES ($1,$2,$3,$4,CURRENT_TIMESTAMP)",
        [userid, serviceid, rating, comment]
      );
      await db.query(
        "UPDATE services SET avg_rating = (SELECT AVG(rating)  FROM reviews WHERE reviews.serviceid = $1),rating_count=rating_count+1 WHERE services.serviceid = $1;",
        [serviceid]
      );

      await db.query(
        "INSERT INTO notifications(userid,raterid,message) VALUES ($1,$2,$3)",
        [ratedid, userid, comment]
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
      "SELECT services.*,users.firstname,users.lastname,users.email,users.profileimg FROM services JOIN users ON services.userid=users.userid WHERE services.serviceid = $1",
      [userid]
    );
  }
  static async getNotifications(userid) {
    const results = await db.query(
      "SELECT notifications.*,users.firstname,users.lastname,users.profileimg FROM notifications JOIN users ON notifications.raterid=users.userid where notifications.userid=$1",
      [userid]
    );
    return results.rows;
  }
  static async getRaterid(userid) {
    const results = await db.query(
      "SELECT firstname,lastname,profileimg FROM users where userid=$1",
      [userid]
    );
    return results.rows;
  }
  static async deleteNotifications(notificationid, userid) {
    const deletionResult = await db.query(
      "DELETE FROM notifications WHERE notificationid = $1 AND userid = $2;",
      [notificationid, userid]
    );
    return deletionResult.rowCount > 0;
  }
  static async getReviewsForService(id) {
    return await db.query(
      "SELECT users.firstname,users.lastname,users.profileimg, reviews.* FROM reviews JOIN users ON reviews.userid = users.userid WHERE reviews.serviceid = $1",
      [id]
    );
  }
  static async getReviewsForServicebyId(id) {
    const serviceid = await db.query(
      "SELECT serviceid from services where userid=$1",
      [id]
    );
    if (!serviceid) {
      return;
    } else {
      return await db.query(
        "SELECT users.firstname,users.lastname,users.profileimg,reviews.* FROM reviews JOIN users ON reviews.userid = users.userid WHERE reviews.serviceid = $1",
        [serviceid.rows[0].serviceid]
      );
    }
  }

  static async sendNotificationToUser(userId, notification) {
    const socketId = await getUserSocketId(userId);
    if (socketId) {
      const io = getIo();
      io.to(socketId).emit("notification", notification);
    } else {
      console.log("no userid provided");
    }
  }
  static async addReaction(reaction, reviewid) {
    const query = `
    UPDATE reviews
    SET ${Object.values(reaction)}
    WHERE reviewid = ${reviewid};
  `;

    return await db.query(query);
  }
}
