
// Cake Routes
const express = require("express");
const router = express.Router();
const Cake = require("../models/Cake");

// 📌 GET all cakes
router.get("/", async (req, res) => {
  try {
    const cakes = await Cake.find();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cakes" });
  }
});

// 📌 ADD a new cake
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newCake = new Cake({ name, description, price });
    await newCake.save();
    res.status(201).json({ message: "Cake added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding cake" });
  }
});

module.exports = router;
