// Fried Desserts Routes
const express = require("express");
const router = express.Router();
const FriedDesserts = require("../models/FriedDesserts");

// 📌 GET all fried desserts
router.get("/", async (req, res) => {
  try {
    const desserts = await FriedDesserts.find();
    res.json(desserts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fried desserts" });
  }
});

// 📌 ADD a new fried dessert
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newDessert = new FriedDesserts({ name, description, price });
    await newDessert.save();
    res.status(201).json({ message: "Fried dessert added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding fried dessert" });
  }
});

module.exports = router;