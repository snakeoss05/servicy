import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./api/config/db.js";
import userRoutes from "./api/routes/userRoutes.js";
import serviceRoutes from "./api/routes/serviceRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use("/api/service", serviceRoutes);
app.use("/api/user", userRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "Page Not Found" }));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
