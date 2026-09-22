import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: "",
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            default: null,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        role: {
            type: String,
            enum: ["user"],
            default: "user",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        phoneVerified: {
            type: Boolean,
            default: false,
        },

        otpCodeHash: {
            type: String,
            default: null,
        },

        otpExpiresAt: {
            type: Date,
            default: null,
        },

        otpAttempts: {
            type: Number,
            default: 0,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);