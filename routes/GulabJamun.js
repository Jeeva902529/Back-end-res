// Gulab Jamun Routes
const express = require("express");
const router = express.Router();
const GulabJamun = require("../models/GulabJamun");

// 📌 GET all Gulab Jamuns
router.get("/", async (req, res) => {
  try {
    const jamuns = await GulabJamun.find();
    res.json(jamuns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Gulab Jamuns" });
  }
});

// 📌 ADD a new Gulab Jamun
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newJamun = new GulabJamun({ name, description, price });
    await newJamun.save();
    res.status(201).json({ message: "Gulab Jamun added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding Gulab Jamun" });
  }
});

module.exports = router;