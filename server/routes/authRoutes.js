import express from "express";

import {
    adminLogin,
    verifyAdminOTP,
    sendUserOTP,
    verifyUserOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/user/send-otp", sendUserOTP);
router.post("/user/verify-otp", verifyUserOTP);

router.post("/admin/login", adminLogin);
router.post("/admin/verify-otp", verifyAdminOTP);

export default router;