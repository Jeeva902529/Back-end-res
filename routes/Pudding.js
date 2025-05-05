// Pudding Routes
const express = require("express");
const router = express.Router();
const Pudding = require("../models/Pudding");

// 📌 GET all puddings
router.get("/", async (req, res) => {
  try {
    const puddings = await Pudding.find();
    res.json(puddings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching puddings" });
  }
});

// 📌 ADD a new pudding
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newPudding = new Pudding({ name, description, price });
    await newPudding.save();
    res.status(201).json({ message: "Pudding added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pudding" });
  }
});

module.exports = router;