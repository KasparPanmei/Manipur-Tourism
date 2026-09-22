import rateLimit from "express-rate-limit";

/*
 * e-ILP order creation limiter
 *
 * 5 booking attempts per IP
 * within 15 minutes.
 */
export const eilpCreateOrderLimiter =
    rateLimit({
        windowMs: 15 * 60 * 1000,

        limit: 5,

        standardHeaders: "draft-8",

        legacyHeaders: false,

        message: {
            success: false,

            message:
                "Too many e-ILP booking attempts from this IP. Please try again after 15 minutes.",
        },
    });


/*
 * Payment verification limiter
 *
 * Allows more requests because payment
 * verification can legitimately be retried.
 */
export const eilpPaymentVerificationLimiter =
    rateLimit({
        windowMs: 10 * 60 * 1000,

        limit: 10,

        standardHeaders: "draft-8",

        legacyHeaders: false,

        message: {
            success: false,

            message:
                "Too many payment verification attempts. Please wait a few minutes and try again.",
        },
    });


/*
 * Payment failure endpoint limiter
 */
export const eilpPaymentFailedLimiter =
    rateLimit({
        windowMs: 10 * 60 * 1000,

        limit: 10,

        standardHeaders: "draft-8",

        legacyHeaders: false,

        message: {
            success: false,

            message:
                "Too many requests. Please try again later.",
        },
    });