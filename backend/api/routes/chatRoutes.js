import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();


router.post("/sendMessage", chatController.createMessage);

router.get("/getMymessage/:userid", chatController.getMessageHistory);


export default router;
