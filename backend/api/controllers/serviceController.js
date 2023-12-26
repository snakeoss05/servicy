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
    const { image1 } = req.file;
    let fieldsToUpdate = {};

    name
      ? (fieldsToUpdate.name = `'${name}'`)
      : res.message("رجاء أختيار أسم الخدمة");
    city
      ? (fieldsToUpdate.city = `'${city}'`)
      : res.message("الرجاء أختيار مدينة");
    address
      ? (fieldsToUpdate.address = `'${address}'`)
      : res.message("الرجاء أختيار عنوان");
    phonenumber
      ? (fieldsToUpdate.phonenumber = `'${phonenumber}'`)
      : res.message("الرجاء أدخال رقم الهاتف");
    category
      ? (fieldsToUpdate.category = `'${category}'`)
      : res.message("الرجاء أختيار تصنيف الخدمة");

    if (image1) {
      const filePath = image1.path;
      const img1 = filePath.replace(/\\/g, "/");
      fieldsToUpdate.image1 = `'${img1}'`;
    }

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
