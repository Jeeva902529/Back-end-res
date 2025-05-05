// Doughnuts Routes
const express = require("express");
const router = express.Router();
const Doughnuts = require("../models/Doughnuts");

// 📌 GET all doughnuts
router.get("/", async (req, res) => {
  try {
    const doughnuts = await Doughnuts.find();
    res.json(doughnuts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doughnuts" });
  }
});

// 📌 ADD a new doughnut
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newDoughnut = new Doughnuts({ name, description, price });
    await newDoughnut.save();
    res.status(201).json({ message: "Doughnut added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding doughnut" });
  }
});

module.exports = router;
