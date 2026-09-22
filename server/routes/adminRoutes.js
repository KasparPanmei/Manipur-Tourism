import { Router } from "express";

import {
    getAdminDashboard,
    getAdminEILPBookings,
    getAdminProductBookings,
} from "../controllers/adminController.js";

const router = Router();


router.get(
    "/dashboard",
    getAdminDashboard
);


router.get(
    "/bookings/eilp",
    getAdminEILPBookings
);

router.get(
    "/bookings/products",
    getAdminProductBookings
);

export default router;