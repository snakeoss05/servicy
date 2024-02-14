import chatDao from "../dao/chatDao.js";

export default class chatController {
  static async createMessage(req, res) {
    const { message, senderID, reciverID } = req.body;

    await chatDao.createMessage(message, senderID, reciverID);
    res.status(200);
  }
  static async getMessageHistory(req, res) {
    const { userid } = req.params;
    const results = await chatDao.getMymessage(userid);
    res.status(200).json(results);
  }
}
