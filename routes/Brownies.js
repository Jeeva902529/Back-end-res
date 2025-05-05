// Brownies Routes
const express = require("express");
const router = express.Router();
const Brownies = require("../models/Brownies");

// 📌 GET all brownies
router.get("/", async (req, res) => {
  try {
    const brownies = await Brownies.find();
    res.json(brownies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching brownies" });
  }
});

// 📌 ADD a new brownie
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newBrownie = new Brownies({ name, description, price });
    await newBrownie.save();
    res.status(201).json({ message: "Brownie added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding brownie" });
  }
});

module.exports = router;
