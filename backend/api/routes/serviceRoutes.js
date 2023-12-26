import express from "express";
import serviceController from "../controllers/serviceController.js";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads"); // Destination folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/get", serviceController.getUsersByServiceName);
router.get("/reviews/:id", serviceController.getReviewsForServices);
router.post(
  "/create",
  upload.single("image1"),
  serviceController.CreateService
);
router.post("/addreview", serviceController.addReview);
router.get("/filter", serviceController.getUsersServiceFilter);
router.get(
  "/getcategory/:category",
  serviceController.getUsersByServiceCategory
);

export default router;
