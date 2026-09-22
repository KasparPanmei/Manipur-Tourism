import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        bookingReference: {
            type: String,
            required: true,
            unique: true,
        },

        bookingType: {
            type: String,
            enum: [
                "eilp",
                "homestay",
                "guide",
                "transportation",
                "rental",
                "craft",
                "tour",
            ],
            required: true,
        },

        title: String,

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
        },

        bookingDate: {
            type: Date,
            default: Date.now,
        },

        details: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Booking", bookingSchema);