const express = require("express");
const bcrypt = require("bcryptjs");
const AppUser = require("../models/AppUser");

const router = express.Router();

// 🔐 Register route
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await AppUser.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AppUser({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// ✅ Keep your login route too
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await AppUser.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

module.exports = router;
