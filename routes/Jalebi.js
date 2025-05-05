// Jalebi Routes
const express = require("express");
const router = express.Router();
const Jalebi = require("../models/Jalebi");

// 📌 GET all Jalebis
router.get("/", async (req, res) => {
  try {
    const jalebis = await Jalebi.find();
    res.json(jalebis);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Jalebis" });
  }
});

// 📌 ADD a new Jalebi
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newJalebi = new Jalebi({ name, description, price });
    await newJalebi.save();
    res.status(201).json({ message: "Jalebi added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding Jalebi" });
  }
});

module.exports = router;
