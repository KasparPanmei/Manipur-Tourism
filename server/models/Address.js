import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
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
    {
        timestamps: true,
    }
);

export default mongoose.model("Address", addressSchema);