// Naan Routes
const express = require("express");
const router = express.Router();
const Naan = require("../models/Naan");

// 📌 GET all naans
router.get("/", async (req, res) => {
  try {
    const naans = await Naan.find();
    res.json(naans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching naans" });
  }
});

// 📌 ADD a new naan
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newNaan = new Naan({ name, description, price });
    await newNaan.save();
    res.status(201).json({ message: "Naan added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding naan" });
  }
});

module.exports = router;
