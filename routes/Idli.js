// Idli Routes
const express = require("express");
const router = express.Router();
const Idli = require("../models/Idli");

// 📌 GET all idlis
router.get("/", async (req, res) => {
  try {
    const idlis = await Idli.find();
    res.json(idlis);
  } catch (error) {
    res.status(500).json({ message: "Error fetching idlis" });
  }
});

// 📌 ADD a new idli
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newIdli = new Idli({ name, description, price });
    await newIdli.save();
    res.status(201).json({ message: "Idli added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding idli" });
  }
});

module.exports = router;
