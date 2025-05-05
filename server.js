require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const loginRoutes = require("./routes/loginRoutes");
const menuRoutes = require("./routes/menuRoutes");
const supportRoutes = require("./routes/support");
const bookingRoutes = require("./routes/bookingRoutes");
const appAuthRoutes = require("./routes/appAuth");
const foodRoutes = require("./routes/foodRouter");

const app = express();

// ✅ CORS Middleware (Updated with your Vercel domain)
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://user-host-pb74-ixy1uhncm-jeeva902529s-projects.vercel.app"
  ],
  credentials: true,
}));

// ✅ Body Parsing (Replaced body-parser with Express built-ins)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/auth", authRoutes);        // 👈 Auth routes (aligned with frontend fetch)
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/login", loginRoutes);      // 👈 Legacy login (if still needed)
app.use("/api/menu", menuRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/app", appAuthRoutes);
app.use("/api/foods", foodRoutes);

// 📩 Support Email Route (Example)
app.post("/api/support", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Support Request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
});

// ✅ Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 API Base URL: https://back-end-res-6emf.onrender.com`);
});
