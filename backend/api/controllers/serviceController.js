import serviceDao from "../dao/serviceDao.js";
import path from "path";
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
  static async addReview(req, res) {
    const { userid, serviceid, rating, comment } = req.body;
    const result = await serviceDao.addReview(
      userid,
      serviceid,
      rating,
      comment
    );
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
    const { name, city, address, rating } = req.query;
    const result = await serviceDao.getUsersServiceFilter(
      name,
      city,
      address,
      rating
    );
    res.status(200).json(result.rows);
  }

  static async getServiceFullInfo(req, res) {
    const { userid } = req.body;
    const result = await serviceDao.getServiceFullInfo(userid);
    res.status(200).json(result.rows);
  }
  static async getReviewsForServices(req, res) {
    const { id } = req.params;
    const result = await serviceDao.getReviewsForService(id);
    res.json(result.rows);
  }
}
