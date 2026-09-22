import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getBookingHistory } from "../controllers/bookingController.js";

const router = Router();

router.get("/history", authMiddleware, getBookingHistory);

export default router;