import bcrypt from 'bcryptjs'
import express from "express"
import User from "../../Models/User.js"
import jwt from 'jsonwebtoken'
// import db from "../database.js";
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        // Destructure and trim values
        const email = req.body.email?.trim();
        const pass = req.body.password?.trim();
        const role = req.body.role?.trim();

        // Check for missing or empty fields
        if (!email || !pass || !role) {
            return res.status(400).json({ error: "All fields are required and cannot be blank." });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(409).json({ message: 'User not found or invalid role' });
        }

        const passwordMatch = await bcrypt.compare(pass, existingUser.password)
        if (!passwordMatch) {
            return res.status(409).json({ message: 'Email and Password do not Match' });
        }
       
        res.status(201).json({ message: "Login successful" });
    } catch (err) {
        // Handle duplicate email
        if (err.code === 11000) {
            return res.status(409).json({ error: "Email already exists" });
        }

        // Handle other errors
        res.status(500).json({ error: err.message });
    }
});

export default router;


