const Login = require("../models/loginModel.js");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// ✅ **User Registration**
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await Login.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create new user
    const newUser = new Login({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// ✅ **User Login**
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user in DB
    const user = await Login.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username or password" });

    // Check password
    const isMatch = user && (await user.comparePassword(password));
    if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

    // Generate Token
    const token = generateToken(user._id);

    // Set token as cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// ✅ **User Logout**
const logoutUser = (req, res) => {
  res.cookie("authToken", "", { expires: new Date(0) }); // Clear the cookie
  res.json({ message: "Logged out successfully" });
};

// ✅ **Check if user is authenticated**
const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Login.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Not authenticated" });

    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error checking authentication", error: error.message });
  }
};

// ✅ **Export all functions**
module.exports = { registerUser, loginUser, logoutUser, checkAuth };
