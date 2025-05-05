const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const { name, password, tableNumber } = req.body;

  if (!name || !password || !tableNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let user = await User.findOne({ name });

    if (!user) {
      // ✅ Register New User (Hash Password)
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, password: hashedPassword, tableNumber });
      await user.save();

      return res.status(201).json({ message: "User registered successfully" });
    }

    // ✅ If User Exists, Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, name: user.name, tableNumber: user.tableNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, tableNumber: user.tableNumber });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
