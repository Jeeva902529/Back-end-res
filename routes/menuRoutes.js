const express = require("express");
const mongoose = require("mongoose");
const getMenuModel = require("../models/menuModel");
const MenuSection = require("../models/menuSectionsModel");

const router = express.Router();

// Add a new dish
router.post("/add", async (req, res) => {
  try {
    const { category, name, image, price, description, type } = req.body;
    if (!category || !name || !price) {
      return res.status(400).json({ error: "Category, name, and price are required" });
    }
    // Check if section exists; if not, create it.
    let section = await MenuSection.findOne({ category });
    if (!section) {
      section = new MenuSection({ category });
      await section.save();
    }
    // Get dynamic model for this category and create the new dish.
    const MenuModel = getMenuModel(category);
    const newDish = new MenuModel({ name, image, price, description, category, type });
    await newDish.save();
    res.status(201).json({ message: `Item added to ${category}`, newDish });
  } catch (error) {
    console.error("Error adding dish:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a dish
router.delete("/delete/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const MenuModel = getMenuModel(category);
    await MenuModel.findByIdAndDelete(id);
    res.json({ message: `Item deleted from ${category}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a dish
router.put("/update/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;
    const updatedData = req.body;
    const MenuModel = getMenuModel(category);
    const updatedDish = await MenuModel.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Dish updated successfully", updatedDish });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all dishes from sections created by your app
router.get("/all", async (req, res) => {
  try {
    const sections = await MenuSection.find({});
    let allDishes = [];
    for (const sec of sections) {
      const MenuModel = getMenuModel(sec.category);
      const dishes = await MenuModel.find();
      // Attach the category to each dish
      allDishes = allDishes.concat(dishes.map(dish => ({ ...dish.toObject(), category: sec.category })));
    }
    res.json(allDishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
