import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password, firstName, lastName, city, state, skillLevel, phoneNumber } = req.body;

    // Validate all required fields
    if (!username || !password || !firstName || !lastName || !city || !state || !skillLevel || !phoneNumber) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    try {
        // Check if the username already exists
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const newUser = new User({
            username,
            password,
            firstName,
            lastName,
            city,
            state,
            skillLevel,
            phoneNumber,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully", username: username });
    } catch (error) {
        console.error("Error in creating user:", error.message);
        res.status(500).json({ message: "Error registering user" });
    }
});

export default router;