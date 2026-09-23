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



const deliveryAddressSchema = new mongoose.Schema(
    {
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            default: null,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            match: /^\d{10}$/,
        },

        addressLine1: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        addressLine2: {
            type: String,
            default: "",
            trim: true,
            maxlength: 200,
        },

        city: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        district: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        state: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        pincode: {
            type: String,
            required: true,
            trim: true,
            match: /^\d{6}$/,
        },

        landmark: {
            type: String,
            default: "",
            trim: true,
            maxlength: 150,
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

        deliveryAddress: {
            type: deliveryAddressSchema,
            required: true,
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