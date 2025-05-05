// Ice Cream Routes
const express = require("express");
const router = express.Router();
const IceCream = require("../models/IceCream");

// 📌 GET all ice creams
router.get("/", async (req, res) => {
  try {
    const iceCreams = await IceCream.find();
    res.json(iceCreams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ice creams" });
  }
});

// 📌 ADD a new ice cream
router.post("/", async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  try {
    const newIceCream = new IceCream({ name, description, price });
    await newIceCream.save();
    res.status(201).json({ message: "Ice cream added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding ice cream" });
  }
});

module.exports = router;
