import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "manipur-tourism-server" });
});

app.get("/", (req, res) => {
  res.json({ message: "Manipur Tourism API is running" });
});

await connectDB();
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
