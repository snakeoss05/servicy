import db from "../config/db.js";
import userDao from "./userDao.js";
import { getIo, getUserSocketId } from "../../socket.js";
export default class chatDao {
  static async createMessage(message, senderID, reciverID) {
    try {
      await db.query(
        "INSERT INTO chat (message,senderId,reciverId,date) values ($1,$2,$3,CURRENT_TIMESTAMP)",
        [message, senderID, reciverID]
      );
      const user = await userDao.getUserById(senderID).rows[0];
      const newMessage = {
        notificationid: Date.now() + reciverID,
        firstname: user.firstname,
        lastname: user.lastname,
        profileimg: user.profileimg,
        created_at: new Date(),
        message: message,
        sender: false,
      };

      const socketId = await getUserSocketId(reciverID);
      if (socketId) {
        const io = getIo();
        io.to(socketId).emit("notification", newMessage);
        io.to(socketId).emit("messageRoam", newMessage);
      } else {
        console.log("no userid provided");
      }
    } catch (err) {
      return { success: false, message: err };
    }
  }
  static async getMymessage(id) {
    try {
      const messages = await db.query(
        "SELECT chat.*,users.firstname,users.lastname,users.profileimg FROM chat JOIN users ON chat.reciverId=users.userid where senderId=$1 OR reciverId=$2  ",
        [id, id]
      );

      return messages.rows.sort((a, b) => a.date - b.date);
      /*   const io = getIo();
      io.to(id).emit("chatHistory", messages); */
    } catch (error) {
      console.error("Error retrieving chat history:", error);
      socket.emit("chatHistoryError", {
        error: "An error occurred while retrieving chat history",
      });
    }
  }
}
