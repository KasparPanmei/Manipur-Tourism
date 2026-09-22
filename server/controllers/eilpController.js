import crypto from "crypto";

import EILPBooking
    from "../models/EILPBooking.js";

import razorpay
    from "../utils/razorpay.js";


const FEES = {
    A: 100,
    B: 500,
    C: 100,
    D: 100,
};


const makeReference = () => {
    return (
        `ILP-${Date.now()
            .toString(36)
            .toUpperCase()}-` +
        crypto
            .randomBytes(3)
            .toString("hex")
            .toUpperCase()
    );
};


const safeBooking = (
    booking
) => ({
    id: booking._id,

    reference:
        booking.reference,

    category:
        booking.category,

    permitFee:
        booking.permitFee,

    paymentMethod:
        booking.paymentMethod,

    paymentStatus:
        booking.paymentStatus,

    status:
        booking.status,

    razorpayOrderId:
        booking.razorpayOrderId,

    razorpayPaymentId:
        booking.razorpayPaymentId ||
        null,
});



export async function createEILPOrder(
    req,
    res
) {
    try {
        const {
            category,
            paymentMethod,
            form,
        } = req.body;


        if (
            ![
                "A",
                "B",
                "C",
                "D",
            ].includes(category)
        ) {
            return res.status(400).json({
                message:
                    "Invalid e-ILP category.",
            });
        }

        if (
            ![
                "upi",
                "card",
                "netbanking",
                "wallet",
            ].includes(paymentMethod)
        ) {
            return res.status(400).json({
                message:
                    "Invalid payment method.",
            });
        }


        const requiredFields = [
            "fullName",
            "idNumber",
            "mobileNo",
            "homeState",

            "entryPoint",
            "arrivalDate",
            "travelPurpose",
            "stayLocation",

            "emergencyName",
            "emergencyPhone",
        ];


        for (
            const field of requiredFields
        ) {
            if (
                !String(
                    form?.[field] ?? ""
                ).trim()
            ) {
                return res.status(400).json({
                    message:
                        `Missing required field: ${field}`,
                });
            }
        }

        const permitFee =
            FEES[category];


        const reference =
            makeReference();

        const order =
            await razorpay.orders.create({
                amount:
                    permitFee * 100,

                currency: "INR",

                receipt:
                    reference,

                notes: {
                    booking_reference:
                        reference,

                    category,

                    applicant_name:
                        String(
                            form.fullName
                        ).slice(0, 100),
                },
            });

        const booking =
            await EILPBooking.create({
                reference,

                category,

                permitFee,

                paymentMethod,

                applicant: {
                    fullName:
                        form.fullName,

                    idNumber:
                        form.idNumber,

                    mobileNo:
                        form.mobileNo,

                    homeState:
                        form.homeState,
                },

                travel: {
                    entryPoint:
                        form.entryPoint,

                    arrivalDate:
                        form.arrivalDate,

                    travelPurpose:
                        form.travelPurpose,

                    stayLocation:
                        form.stayLocation,
                },

                emergency: {
                    name:
                        form.emergencyName,

                    phone:
                        form.emergencyPhone,
                },

                razorpayOrderId:
                    order.id,

                paymentStatus:
                    "pending",

                status:
                    "pending",
            });

        return res.status(201).json({
            booking: {
                ...safeBooking(
                    booking
                ),

                amountPaise:
                    order.amount,

                currency:
                    order.currency,

                razorpayKeyId:
                    process.env
                        .RAZORPAY_KEY_ID,
            },
        });

    } catch (error) {

        console.error(
            "createEILPOrder:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to create e-ILP payment order.",
        });
    }
}



export async function verifyEILPPayment(
    req,
    res
) {
    try {

        const {
            reference,

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,
        } = req.body;


        const booking =
            await EILPBooking.findOne({
                reference,
            });


        if (!booking) {
            return res.status(404).json({
                message:
                    "e-ILP application not found.",
            });
        }


        if (
            booking.paymentStatus ===
            "paid"
        ) {
            return res.json({
                verified: true,

                message:
                    "Payment already verified.",

                booking:
                    safeBooking(
                        booking
                    ),
            });
        }

        if (
            booking.razorpayOrderId !==
            razorpay_order_id
        ) {
            return res.status(400).json({
                message:
                    "Invalid Razorpay order.",
            });
        }

        const payload =
            `${razorpay_order_id}|${razorpay_payment_id}`;


        const expectedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env
                        .RAZORPAY_KEY_SECRET
                )
                .update(payload)
                .digest("hex");

        const signaturesMatch =
            expectedSignature.length ===
            String(
                razorpay_signature
            ).length &&
            crypto.timingSafeEqual(
                Buffer.from(
                    expectedSignature
                ),
                Buffer.from(
                    String(
                        razorpay_signature
                    )
                )
            );


        if (!signaturesMatch) {

            booking.paymentStatus =
                "failed";

            await booking.save();

            return res.status(400).json({
                verified: false,

                message:
                    "Razorpay signature verification failed.",
            });
        }

        const payment =
            await razorpay.payments.fetch(
                razorpay_payment_id
            );

        if (
            payment.order_id !==
            booking.razorpayOrderId ||

            Number(
                payment.amount
            ) !==
            booking.permitFee * 100 ||

            payment.currency !==
            "INR"
        ) {

            return res.status(400).json({
                verified: false,

                message:
                    "Payment amount or order does not match the application.",
            });
        }


        if (
            payment.status !==
            "captured"
        ) {

            return res.status(400).json({
                verified: false,

                message:
                    `Payment status is ${payment.status}. Payment is not captured yet.`,
            });
        }


        booking.paymentStatus =
            "paid";

        booking.status =
            "confirmed";

        booking.razorpayPaymentId =
            razorpay_payment_id;

        booking.razorpaySignature =
            razorpay_signature;

        booking.paidAt =
            new Date();


        await booking.save();


        return res.json({
            verified: true,

            message:
                "Payment verified successfully.",

            booking:
                safeBooking(
                    booking
                ),
        });

    } catch (error) {

        console.error(
            "verifyEILPPayment:",
            error
        );

        return res.status(500).json({
            verified: false,

            message:
                "Payment verification failed.",
        });
    }
}


export async function markEILPPaymentFailed(
    req,
    res
) {
    try {

        const {
            reference,
        } = req.body;


        const booking =
            await EILPBooking.findOne({
                reference,
            });


        if (!booking) {
            return res.status(404).json({
                message:
                    "e-ILP application not found.",
            });
        }


        if (
            booking.paymentStatus !==
            "paid"
        ) {

            booking.paymentStatus =
                "failed";

            await booking.save();
        }


        return res.json({
            message:
                "Payment failure recorded.",

            booking:
                safeBooking(
                    booking
                ),
        });

    } catch (error) {

        console.error(
            "markEILPPaymentFailed:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to update payment status.",
        });
    }
}
export const getPublicEILP = async (req, res) => {
    try {
        const { reference } = req.params;

        const booking = await EILPBooking.findOne({
            reference,
            paymentStatus: "paid",
            status: "confirmed",
        }).lean();

        if (!booking) {
            return res.status(404).json({
                message: "Valid e-ILP permit not found.",
            });
        }

        return res.json({
            booking: {
                reference: booking.reference,
                category: booking.category,
                permitFee: booking.permitFee,
                paymentMethod: booking.paymentMethod,
                paymentStatus: booking.paymentStatus,
                status: booking.status,

                fullName: booking.fullName,
                homeState: booking.homeState,

                entryPoint: booking.entryPoint,
                arrivalDate: booking.arrivalDate,
                travelPurpose: booking.travelPurpose,
                stayLocation: booking.stayLocation,
            },
        });
    } catch (error) {
        console.error("e-ILP verification error:", error);

        return res.status(500).json({
            message: "Unable to verify e-ILP.",
        });
    }
};
