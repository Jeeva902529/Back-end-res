// Sandwich Routes
const express = require("express");
const router = express.Router();
const Sandwich = require("../models/Sandwich");

// 📌 GET all sandwiches
router.get("/", async (req, res) => {
  try {
    const sandwiches = await Sandwich.find();
    res.json(sandwiches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sandwiches" });
  }
});

// 📌 ADD a new sandwich
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newSandwich = new Sandwich({ name, description, price });
    await newSandwich.save();
    res.status(201).json({ message: "Sandwich added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding sandwich" });
  }
});

module.exports = router;