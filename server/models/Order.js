import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        image: {
            type: String,
            default: "",
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        items: {
            type: [orderItemSchema],
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            default: "INR",
        },

        status: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "cancelled",
            ],
            default: "pending",
        },

        razorpayOrderId: {
            type: String,
            required: true,
            unique: true,
        },

        razorpayPaymentId: {
            type: String,
            default: null,
        },

        razorpaySignature: {
            type: String,
            default: null,
        },

        receipt: {
            type: String,
            required: true,
            unique: true,
        },

        paidAt: {
            type: Date,
            default: null,
        },

        failedAt: {
            type: Date,
            default: null,
        },
    },

    {
        timestamps: true,
    }
);

export default mongoose.model("Order", orderSchema);