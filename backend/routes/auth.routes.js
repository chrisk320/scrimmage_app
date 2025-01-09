import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

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

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Please provide username and password." });
    }
  
    try {
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Match passwords
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Create a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  
      // Send token and user data
      res.status(200).json({
        message: "Login successful!",
        token,
        user: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          state: user.state,
          skillLevel: user.skillLevel,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  });

export default router;