import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Admin from "../models/Admin.js";
import User from "../models/Users.js";

const generateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

const hashOTP = (otp) => {
    return crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
};

const generateToken = (admin) => {
    return jwt.sign(
        {
            id: admin._id.toString(),
            username: admin.username,
            role: "admin",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required.",
            });
        }

        const normalizedUsername = username.trim().toLowerCase();

        const admin = await Admin.findOne({
            username: normalizedUsername,
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid username or password.",
            });
        }

        if (!admin.isActive) {
            return res.status(403).json({
                message: "Admin account is inactive.",
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            admin.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid username or password.",
            });
        }

        /*
         * Generate 6-digit OTP
         */
        const otp = generateOTP();

        /*
         * Store only the hash
         */
        admin.otpCodeHash = hashOTP(otp);

        /*
         * OTP valid for 5 minutes
         */
        admin.otpExpiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );

        admin.otpAttempts = 0;

        await admin.save();

        if (process.env.NODE_ENV !== "production") {
            console.log(
                `ADMIN OTP for ${admin.username}: ${otp}`
            );
        }

        return res.json({
            requiresOtp: true,
            message: "Password verified. OTP sent.",
        });

    } catch (error) {
        console.error("Admin login error:", error);

        return res.status(500).json({
            message: "Authentication failed.",
        });
    }
};


export const verifyAdminOTP = async (req, res) => {
    try {
        const { username, otp } = req.body;

        if (!username || !otp) {
            return res.status(400).json({
                message: "Username and OTP are required.",
            });
        }

        const normalizedUsername = username.trim().toLowerCase();

        const admin = await Admin.findOne({
            username: normalizedUsername,
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid authentication request.",
            });
        }

        /*
         * Check OTP expiry
         */
        if (
            !admin.otpExpiresAt ||
            admin.otpExpiresAt.getTime() < Date.now()
        ) {
            admin.otpCodeHash = null;
            admin.otpExpiresAt = null;
            admin.otpAttempts = 0;

            await admin.save();

            return res.status(401).json({
                message: "OTP has expired. Please login again.",
            });
        }

        /*
         * Limit attempts
         */
        if (admin.otpAttempts >= 5) {
            admin.otpCodeHash = null;
            admin.otpExpiresAt = null;

            await admin.save();

            return res.status(429).json({
                message: "Too many incorrect OTP attempts. Please login again.",
            });
        }

        const submittedHash = hashOTP(otp.trim());

        if (submittedHash !== admin.otpCodeHash) {
            admin.otpAttempts += 1;

            await admin.save();

            return res.status(401).json({
                message: "Invalid OTP.",
            });
        }

        /*
         * OTP is correct
         */

        const token = generateToken(admin);

        admin.otpCodeHash = null;
        admin.otpExpiresAt = null;
        admin.otpAttempts = 0;
        admin.lastLoginAt = new Date();

        await admin.save();

        return res.json({
            message: "Admin authentication successful.",
            token,
            user: {
                id: admin._id,
                username: admin.username,
                role: admin.role,
            },
        });

    } catch (error) {
        console.error("Admin OTP verification error:", error);

        return res.status(500).json({
            message: "OTP verification failed.",
        });
    }
};
const generateUserToken = (user) => {
    return jwt.sign(
        {
            id: user._id.toString(),
            phone: user.phone,
            role: "user",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};
export const sendUserOTP = async (req, res) => {
    try {
        const { mobile } = req.body;

        const cleanedMobile = String(mobile || "")
            .replace(/\D/g, "");

        if (!/^\d{10}$/.test(cleanedMobile)) {
            return res.status(400).json({
                message: "Please enter a valid 10-digit mobile number.",
            });
        }

        let user = await User.findOne({
            phone: cleanedMobile,
        });

        if (!user) {
            user = await User.create({
                name: "",
                phone: cleanedMobile,
                role: "user",
                isActive: true,
                phoneVerified: false,
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "This user account is inactive.",
            });
        }

        const otp = generateOTP();

        user.otpCodeHash = hashOTP(otp);
        user.otpExpiresAt = new Date(
            Date.now() + 5 * 60 * 1000
        );
        user.otpAttempts = 0;

        await user.save();

        if (process.env.NODE_ENV !== "production") {
            console.log(
                `USER OTP for +91 ${cleanedMobile}: ${otp}`
            );
        }

        return res.json({
            message:
                process.env.NODE_ENV === "production"
                    ? "OTP sent successfully."
                    : "OTP generated successfully.",
            ...(process.env.NODE_ENV !== "production"
                ? { devOtp: otp }
                : {}),
        });
    } catch (error) {
        console.error("User send OTP error:", error);

        return res.status(500).json({
            message: "Unable to send OTP.",
        });
    }
};

export const verifyUserOTP = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        const cleanedMobile = String(mobile || "")
            .replace(/\D/g, "");

        const submittedOtp = String(otp || "").trim();

        if (!/^\d{10}$/.test(cleanedMobile)) {
            return res.status(400).json({
                message: "Invalid mobile number.",
            });
        }

        if (!/^\d{6}$/.test(submittedOtp)) {
            return res.status(400).json({
                message: "Please enter the 6-digit OTP.",
            });
        }

        const user = await User.findOne({
            phone: cleanedMobile,
        });

        if (!user) {
            return res.status(404).json({
                message: "User account not found. Please request a new OTP.",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                message: "This user account is inactive.",
            });
        }

        if (
            !user.otpExpiresAt ||
            user.otpExpiresAt.getTime() < Date.now()
        ) {
            user.otpCodeHash = null;
            user.otpExpiresAt = null;
            user.otpAttempts = 0;

            await user.save();

            return res.status(401).json({
                message: "OTP has expired. Please request a new OTP.",
            });
        }

        if (user.otpAttempts >= 5) {
            user.otpCodeHash = null;
            user.otpExpiresAt = null;
            user.otpAttempts = 0;

            await user.save();

            return res.status(429).json({
                message:
                    "Too many incorrect OTP attempts. Please request a new OTP.",
            });
        }

        const submittedHash = hashOTP(submittedOtp);

        if (submittedHash !== user.otpCodeHash) {
            user.otpAttempts += 1;

            await user.save();

            return res.status(401).json({
                message: "Invalid OTP.",
            });
        }

        const token = generateUserToken(user);

        user.otpCodeHash = null;
        user.otpExpiresAt = null;
        user.otpAttempts = 0;
        user.phoneVerified = true;
        user.lastLoginAt = new Date();

        await user.save();

        return res.json({
            message: "User authentication successful.",
            token,
            user: {
                id: user._id,
                name: user.name || `User ${user.phone.slice(-4)}`,
                mobile: user.phone,
                phone: user.phone,
                phoneVerified: user.phoneVerified,
                role: "user",
            },
        });
    } catch (error) {
        console.error("User OTP verification error:", error);

        return res.status(500).json({
            message: "OTP verification failed.",
        });
    }
};