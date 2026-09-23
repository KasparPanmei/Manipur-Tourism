import mongoose from "mongoose";
import crypto from "crypto";

import Cart from "../models/Cart.js";
import User from "../models/Users.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";

import razorpay from "../utils/razorpay.js";


export const createCartPaymentOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(401).json({
                message: "User account is not available.",
            });
        }

        const cart = await Cart.findOne({
            user: req.user.id,
        });

        if (!cart || !cart.items?.length) {
            return res.status(400).json({
                message: "Your cart is empty.",
            });
        }

        const { addressId } = req.body || {};

        if (
            !addressId ||
            !mongoose.Types.ObjectId.isValid(addressId)
        ) {
            return res.status(400).json({
                message:
                    "A valid delivery address is required before booking.",
            });
        }

        const deliveryAddress =
            await Address.findOne({
                _id: addressId,
                user: req.user.id,
            }).lean();

        if (!deliveryAddress) {
            return res.status(400).json({
                message:
                    "Selected delivery address was not found.",
            });
        }

        const totalAmount = cart.items.reduce(
            (total, item) =>
                total +
                Number(item.price) *
                Number(item.quantity),
            0
        );

        if (
            !Number.isFinite(totalAmount) ||
            totalAmount <= 0
        ) {
            return res.status(400).json({
                message: "Invalid cart total.",
            });
        }

        const amountPaise = Math.round(
            totalAmount * 100
        );

        const receipt = `CART_${Date.now()}`;

        const razorpayOrder =
            await razorpay.orders.create({
                amount: amountPaise,
                currency: "INR",
                receipt,

                notes: {
                    userId: req.user.id.toString(),
                    type: "CULTURE_HERITAGE_CART",
                },
            });

        const order = await Order.create({
            user: req.user.id,

            items: cart.items.map((item) => ({
                itemId: item.itemId,
                name: item.name,
                image: item.image || "",
                price: Number(item.price),
                quantity: Number(item.quantity),
            })),

            amount: totalAmount,

            deliveryAddress: {
                addressId: deliveryAddress._id,
                fullName: deliveryAddress.fullName,
                phone: deliveryAddress.phone,
                addressLine1: deliveryAddress.addressLine1,
                addressLine2: deliveryAddress.addressLine2 || "",
                city: deliveryAddress.city,
                district: deliveryAddress.district,
                state: deliveryAddress.state,
                pincode: deliveryAddress.pincode,
                landmark: deliveryAddress.landmark || "",
            },

            currency: "INR",

            status: "pending",

            razorpayOrderId:
                razorpayOrder.id,

            receipt,
        });

        return res.status(201).json({
            success: true,

            orderId: order._id.toString(),

            razorpayOrderId:
                razorpayOrder.id,

            amount: totalAmount,

            amountPaise,

            currency: "INR",

            receipt,

            razorpayKeyId:
                process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error(
            "Create cart payment order error:",
            error
        );

        return res.status(500).json({
            success: false,

            message:
                error?.error?.description ||
                error?.message ||
                "Unable to create payment order.",
        });
    }
};


export const verifyCartPayment = async (
    req,
    res
) => {
    try {
        const {
            orderId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        // Idempotency
        if (order.status === "paid") {
            return res.json({
                success: true,
                message: "Payment already verified.",
                order,
            });
        }

        if (
            order.razorpayOrderId !==
            razorpay_order_id
        ) {
            return res.status(400).json({
                message:
                    "Razorpay order ID does not match.",
            });
        }

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    `${razorpay_order_id}|${razorpay_payment_id}`
                )
                .digest("hex");

        if (
            generatedSignature !==
            razorpay_signature
        ) {
            return res.status(400).json({
                message:
                    "Invalid Razorpay payment signature.",
            });
        }

        const payment =
            await razorpay.payments.fetch(
                razorpay_payment_id
            );

        if (
            payment.order_id !==
            razorpay_order_id
        ) {
            return res.status(400).json({
                message:
                    "Payment order mismatch.",
            });
        }

        if (
            Number(payment.amount) !==
            Math.round(order.amount * 100)
        ) {
            return res.status(400).json({
                message:
                    "Payment amount mismatch.",
            });
        }

        if (payment.currency !== "INR") {
            return res.status(400).json({
                message:
                    "Invalid payment currency.",
            });
        }

        if (payment.status !== "captured") {
            return res.status(400).json({
                message:
                    "Payment has not been captured.",
            });
        }

        order.status = "paid";

        order.razorpayPaymentId =
            razorpay_payment_id;

        order.razorpaySignature =
            razorpay_signature;

        order.paidAt = new Date();

        await order.save();

        // Clear cart ONLY after successful verification
        await Cart.findOneAndUpdate(
            {
                user: req.user.id,
            },
            {
                $set: {
                    items: [],
                    total: 0,
                },
            }
        );

        return res.json({
            success: true,

            message:
                "Payment verified successfully.",

            order,
        });
    } catch (error) {
        console.error(
            "Verify cart payment error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to verify payment.",
        });
    }
};


export const markCartPaymentFailed = async (
    req,
    res
) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findOne({
            _id: orderId,
            user: req.user.id,
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found.",
            });
        }

        if (order.status === "paid") {
            return res.status(400).json({
                message:
                    "Paid orders cannot be marked failed.",
            });
        }

        order.status = "failed";
        order.failedAt = new Date();

        await order.save();

        return res.json({
            success: true,
            message: "Payment marked as failed.",
        });
    } catch (error) {
        console.error(
            "Mark cart payment failed error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to update payment status.",
        });
    }
};