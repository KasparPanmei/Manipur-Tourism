import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const username = "admin";

        const password = "admin123";

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit(0);
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await Admin.create({
            username,
            passwordHash,
            role: "admin",
            isActive: true,
        });

        console.log("Admin created successfully.");
        console.log(`Username: ${username}`);
        console.log("Password: [the password you configured in the script]");

        process.exit(0);
    } catch (error) {
        console.error("Failed to create admin:", error);
        process.exit(1);
    }
};

createAdmin();