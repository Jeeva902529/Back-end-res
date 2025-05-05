const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 📌 Fetch Latest Orders (As Cart Items)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 }); // Fetch latest orders
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
