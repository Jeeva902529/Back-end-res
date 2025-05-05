const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const ArchivedOrder = require("../models/ArchivedOrder");

// 📌 GET all orders
router.get("/my-orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 📌 PLACE a new order
router.post("/place-order", async (req, res) => {
  const { foodName, basePrice, addOns, specialInstructions, totalPrice, tableNumber } = req.body;

  if (!foodName || !basePrice || !totalPrice || !tableNumber) {
    return res.status(400).json({ message: "All fields (foodName, basePrice, totalPrice, tableNumber) are required" });
  }

  try {
    const newOrder = new Order({
      foodName,
      basePrice,
      addOns,
      specialInstructions,
      totalPrice,
      tableNumber,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
});

// 📌 DELETE an order
router.delete("/cancel-order/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling order" });
  }
});

// 📌 MARK orders as paid (archive & delete)
router.post("/mark-paid/:tableNumber", async (req, res) => {
  const { tableNumber } = req.params;

  try {
    const orders = await Order.find({ tableNumber: parseInt(tableNumber) });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this table" });
    }

    // Prepare archive orders with timestamp
    const archivedOrders = orders.map((order) => {
      const archived = { ...order.toObject(), paidAt: new Date() };
      delete archived._id; // Remove _id to prevent conflict
      return archived;
    });

    await ArchivedOrder.insertMany(archivedOrders);
    await Order.deleteMany({ tableNumber: parseInt(tableNumber) });

    res.status(200).json({ message: `Orders for Table ${tableNumber} archived and cleared.` });
  } catch (error) {
    console.error("Error archiving orders:", error);
    res.status(500).json({ message: "Server error archiving orders." });
  }
});

module.exports = router;
