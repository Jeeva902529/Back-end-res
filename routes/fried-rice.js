const express = require("express")
const router = express.Router()
const FriedRice = require("../models/FriedRice")

// GET all fried rice
router.get("/", async (req, res) => {
  try {
    const friedRice = await FriedRice.find()
    res.json(friedRice)
  } catch (error) {
    res.status(500).json({ message: "Error fetching fried rice" })
  }
})

// ADD a new fried rice
router.post("/", async (req, res) => {
  const { name, description, price, type, spiceLevel } = req.body

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" })
  }

  try {
    const newFriedRice = new FriedRice({
      name,
      description,
      price,
      type,
      spiceLevel,
    })
    await newFriedRice.save()
    res.status(201).json({ message: "Fried rice added successfully!" })
  } catch (error) {
    res.status(500).json({ message: "Error adding fried rice" })
  }
})

module.exports = router

