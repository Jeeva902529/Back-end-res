const express = require("express");
const router = express.Router();
const Momo = require("../models/Momo");

// 📌 GET all momos
router.get("/", async (req, res) => {
  try {
    const momos = await Momo.find();
    res.json(momos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching momos" });
  }
});

// 📌 ADD a new momo
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newMomo = new Momo({ name, description, price });
    await newMomo.save();
    res.status(201).json({ message: "Momo added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding momo" });
  }
});

module.exports = router;
