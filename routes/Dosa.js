const express = require("express");
const router = express.Router();
const Dosa = require("../models/Dosa");

// 📌 GET all dosas
router.get("/", async (req, res) => {
  try {
    const dosas = await Dosa.find();
    res.json(dosas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dosas" });
  }
});

// 📌 ADD a new dosa
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newDosa = new Dosa({ name, description, price });
    await newDosa.save();
    res.status(201).json({ message: "Dosa added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding dosa" });
  }
});

module.exports = router;