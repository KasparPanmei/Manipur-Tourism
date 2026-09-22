import { Router } from "express";

import {
    createEILPOrder,
    verifyEILPPayment,
    markEILPPaymentFailed,
    getPublicEILP,
} from "../controllers/eilpController.js";

import {
    eilpCreateOrderLimiter,
    eilpPaymentVerificationLimiter,
    eilpPaymentFailedLimiter,
} from "../middleware/rateLimiter.js";


const router = Router();

router.post(
    "/create-order",
    eilpCreateOrderLimiter,
    createEILPOrder
);



router.post(
    "/verify-payment",
    eilpPaymentVerificationLimiter,
    verifyEILPPayment
);



router.post(
    "/payment-failed",
    eilpPaymentFailedLimiter,
    markEILPPaymentFailed
);
router.get("/verify/:reference", getPublicEILP);


export default router;