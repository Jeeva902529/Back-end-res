const express = require("express");
const router = express.Router();
const Pasta = require("../models/Pasta");

// 📌 GET all pastas
router.get("/", async (req, res) => {
  try {
    const pastas = await Pasta.find();
    res.json(pastas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pastas" });
  }
});

// 📌 ADD a new pasta
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newPasta = new Pasta({ name, description, price });
    await newPasta.save();
    res.status(201).json({ message: "Pasta added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pasta" });
  }
});

module.exports = router;
