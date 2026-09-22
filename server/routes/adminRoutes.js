import { Router } from "express";

import {
    getAdminDashboard,
    getAdminEILPBookings,
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

export default router;