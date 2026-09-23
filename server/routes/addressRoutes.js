import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    getAddress,
    saveAddress,
    deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();


router.get(
    "/",
    authMiddleware,
    getAddress
);


router.put(
    "/",
    authMiddleware,
    saveAddress
);



router.delete(
    "/:addressId",
    authMiddleware,
    deleteAddress
);


export default router;