const express = require("express");
const router = express.Router();
const FoodItem = require("../models/FoodItem"); // Adjust path if needed

// ✅ PATCH: Decrease quantity by 1 (universal for all items)
router.patch("/:id/decrease-quantity", async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.quantity <= 0) {
      return res.status(400).json({ message: "Item is out of stock" });
    }

    item.quantity -= 1;
    await item.save();

    res.json({ message: "Quantity reduced", item });
  } catch (err) {
    console.error("🔥 Error reducing quantity:", err);
    res.status(500).json({ message: "Error reducing quantity", error: err.message });
  }
});

// ✅ GET all items from a specific category
router.get("/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const items = await FoodItem.find({ category });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ✅ POST new item in category
router.post("/:category", async (req, res) => {
  const { name, description, price, type, quantity } = req.body;
  const category = req.params.category;

  if (!name || !price || !type || quantity == null) {
    return res.status(400).json({ message: "Name, price, type, and quantity are required" });
  }

  try {
    const newItem = new FoodItem({
      category,
      name,
      description,
      price,
      type,
      quantity,
    });

    await newItem.save();
    res.status(201).json({ message: "Item added successfully!", item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding item" });
  }
});

// ✅ PUT (edit existing item)
router.put("/:category/:id", async (req, res) => {
  const { name, description, price, type, quantity } = req.body;

  if (!name || !price || !type || quantity == null) {
    return res.status(400).json({ message: "Name, price, type, and quantity are required" });
  }

  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      { name, description, price, type, quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully", item: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating item" });
  }
});

// ✅ DELETE item
router.delete("/:category/:id", async (req, res) => {
  try {
    const deletedItem = await FoodItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
