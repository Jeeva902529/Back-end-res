const express = require("express");
const router = express.Router();
const Cookies = require("../models/Cookies");

// 📌 GET all cookies
router.get("/", async (req, res) => {
  try {
    const cookies = await Cookies.find();
    res.json(cookies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cookies" });
  }
});

// 📌 ADD a new cookie
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newCookie = new Cookies({ name, description, price });
    await newCookie.save();
    res.status(201).json({ message: "Cookie added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding cookie" });
  }
});

module.exports = router;
