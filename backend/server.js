import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./api/routes/userRoutes.js";
import chatRoutes from "./api/routes/chatRoutes.js";
import serviceRoutes from "./api/routes/serviceRoutes.js";
import { createServer } from "http";
import { initSocket } from "./socket.js";

const app = express();
dotenv.config();
app.use(cors());

const server = createServer(app);
const PORT = process.env.PORT || 3000;

initSocket(server);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use("/api/service", serviceRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "Page Not Found" }));
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
