import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        // Temporary hashed OTP
        otpCodeHash: {
            type: String,
            default: null,
        },

        // OTP expiration time
        otpExpiresAt: {
            type: Date,
            default: null,
        },

        // Number of failed OTP attempts
        otpAttempts: {
            type: Number,
            default: 0,
        },

        role: {
            type: String,
            enum: ["admin"],
            default: "admin",
        },

        isActive: {
            type: Boolean,
            default: true,
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

export default mongoose.model("Admin", adminSchema);