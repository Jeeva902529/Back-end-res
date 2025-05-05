// Pizza Routes
const express = require("express");
const router = express.Router();
const Pizza = require("../models/Pizza");

// 📌 GET all pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pizzas" });
  }
});

// 📌 ADD a new pizza
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newPizza = new Pizza({ name, description, price });
    await newPizza.save();
    res.status(201).json({ message: "Pizza added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding pizza" });
  }
});

module.exports = router;