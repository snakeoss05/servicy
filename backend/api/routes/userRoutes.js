import express from "express";
import UserController from "../controllers/userController.js";
import multer from "multer";
import path from "path";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination folder to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/get/:serviceid", UserController.getUserByService);
router.get("/profile", UserController.authenticateToken);
router.put("/update", upload.single("picture"), UserController.updateUserState);

export default router;
