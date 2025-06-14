import bcrypt from 'bcryptjs'
import express from "express"
import User from "../../Models/User.js"
// import db from "../database.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Destructure and trim values
    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const pass = req.body.password?.trim();
    const role = req.body.role?.trim();
     
   

    // Check for missing or empty fields
    if (!name || !email || !pass || !role) {
      return res.status(400).json({ error: "All fields are required and cannot be blank." });
    }
    
    const hashedPassword = await bcrypt.hash(pass, 10)
    // Create and save user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
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


