// Roll Routes
const express = require("express");
const router = express.Router();
const Roll = require("../models/Roll");

// 📌 GET all rolls
router.get("/", async (req, res) => {
  try {
    const rolls = await Roll.find();
    res.json(rolls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rolls" });
  }
});

// 📌 ADD a new roll
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newRoll = new Roll({ name, description, price });
    await newRoll.save();
    res.status(201).json({ message: "Roll added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding roll" });
  }
});

module.exports = router;
