import express from "express";
import serviceController from "../controllers/serviceController.js";
import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename for the image
  },
});

const upload = multer({ storage });

router.get("/get", serviceController.getUsersByServiceName);
router.get("/getbyid/:id", serviceController.getReviewsForServiceByid);
router.get("/reviews/:id", serviceController.getReviewsForServices);
router.post(
  "/create",
  upload.single("image1"),
  serviceController.CreateService
);
router.put(
  "/update",
  upload.single("picture"),
  serviceController.updateService
);
router.put("/addreaction", serviceController.addReaction);
router.get("/fullinfo/:userid", serviceController.getServiceFullInfo);
router.post("/addreview", serviceController.addReview);
router.get("/filter", serviceController.getUsersServiceFilter);
router.get(
  "/getcategory/:category",
  serviceController.getUsersByServiceCategory
);
router.get("/notfications/:userid", serviceController.getNotfications);
router.delete("/notfications/delete", serviceController.deleteNotification);

export default router;
