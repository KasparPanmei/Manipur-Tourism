import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    createCartPaymentOrder,
    verifyCartPayment,
    markCartPaymentFailed,
} from "../controllers/cartPaymentController.js";

const router = Router();

router.post(
    "/create-order",
    authMiddleware,
    createCartPaymentOrder
);

router.post(
    "/verify-payment",
    authMiddleware,
    verifyCartPayment
);

router.post(
    "/payment-failed",
    authMiddleware,
    markCartPaymentFailed
);

export default router;