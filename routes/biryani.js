// Biryani Routes
const express = require("express");
const router = express.Router();
const Biryani = require("../models/Biryani");

// 📌 GET all biryanis
router.get("/", async (req, res) => {
  try {
    const biryanis = await Biryani.find();
    res.json(biryanis);
  } catch (error) {
    res.status(500).json({ message: "Error fetching biryanis" });
  }
});

// 📌 ADD a new biryani
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newBiryani = new Biryani({ name, description, price });
    await newBiryani.save();
    res.status(201).json({ message: "Biryani added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding biryani" });
  }
});

module.exports = router;