const express = require("express");
const router = express.Router();
const Burger = require("../models/Burger");

// 📌 GET all burgers
router.get("/", async (req, res) => {
  try {
    const burgers = await Burger.find();
    res.json(burgers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching burgers" });
  }
});

// 📌 ADD a new burger
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newBurger = new Burger({ name, description, price });
    await newBurger.save();
    res.status(201).json({ message: "Burger added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding burger" });
  }
});

module.exports = router;
