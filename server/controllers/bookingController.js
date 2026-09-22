import Order from "../models/Order.js";

export const getBookingHistory = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        return res.json({
            bookings: orders,
        });
    } catch (error) {
        console.error("Get booking history error:", error);

        return res.status(500).json({
            message: "Unable to load booking history.",
        });
    }
};