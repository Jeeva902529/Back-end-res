// Halwa Routes
const express = require("express");
const router = express.Router();
const Halwa = require("../models/Halwa");

// 📌 GET all Halwas
router.get("/", async (req, res) => {
  try {
    const halwas = await Halwa.find();
    res.json(halwas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Halwas" });
  }
});

// 📌 ADD a new Halwa
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newHalwa = new Halwa({ name, description, price });
    await newHalwa.save();
    res.status(201).json({ message: "Halwa added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding Halwa" });
  }
});

module.exports = router;
