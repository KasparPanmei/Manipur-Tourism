import mongoose from "mongoose";

const eilpBookingSchema =
    new mongoose.Schema(
        {
            reference: {
                type: String,
                required: true,
                unique: true,
                index: true,
            },

            category: {
                type: String,
                enum: [
                    "A",
                    "B",
                    "C",
                    "D",
                ],
                required: true,
            },

            permitFee: {
                type: Number,
                required: true,
            },

            paymentMethod: {
                type: String,
                enum: [
                    "upi",
                    "card",
                    "netbanking",
                    "wallet",
                ],
                required: true,
            },

            paymentStatus: {
                type: String,
                enum: [
                    "pending",
                    "paid",
                    "failed",
                ],
                default: "pending",
                index: true,
            },

            status: {
                type: String,
                enum: [
                    "pending",
                    "confirmed",
                    "cancelled",
                ],
                default: "pending",
                index: true,
            },

            applicant: {
                fullName: {
                    type: String,
                    required: true,
                    trim: true,
                },

                idNumber: {
                    type: String,
                    required: true,
                    trim: true,
                },

                mobileNo: {
                    type: String,
                    required: true,
                    trim: true,
                },

                homeState: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },

            travel: {
                entryPoint: {
                    type: String,
                    required: true,
                    trim: true,
                },

                arrivalDate: {
                    type: String,
                    required: true,
                },

                travelPurpose: {
                    type: String,
                    required: true,
                    trim: true,
                },

                stayLocation: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },

            emergency: {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                },

                phone: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },

            razorpayOrderId: {
                type: String,
                index: true,
            },

            razorpayPaymentId: {
                type: String,
                index: true,
            },

            razorpaySignature: String,

            paidAt: Date,
        },

        {
            timestamps: true,
        }
    );

export default mongoose.model(
    "EILPBooking",
    eilpBookingSchema
);