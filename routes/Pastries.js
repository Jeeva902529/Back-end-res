// Pastries Routes
const express = require("express");
const router = express.Router();
const Pastries = require("../models/Pastries");

// 📌 GET all pastries
router.get("/", async (req, res) => {
  try {
    const pastries = await Pastries.find();
    res.json(pastries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pastries" });
  }
});

// 📌 ADD a new pastry
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newPastry = new Pastries({ name, description, price });
    await newPastry.save();
    res.status(201).json({ message: "Pastry added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pastry" });
  }
});

module.exports = router;