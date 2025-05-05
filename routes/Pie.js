// Pie Routes
const express = require("express");
const router = express.Router();
const Pie = require("../models/Pie");

// 📌 GET all pies
router.get("/", async (req, res) => {
  try {
    const pies = await Pie.find();
    res.json(pies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pies" });
  }
});

// 📌 ADD a new pie
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newPie = new Pie({ name, description, price });
    await newPie.save();
    res.status(201).json({ message: "Pie added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pie" });
  }
});

module.exports = router;
