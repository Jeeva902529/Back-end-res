const express = require("express");
const router = express.Router();
const bookingModel = require("../models/bookingModel");

// GET /api/booking - Fetch all orders
router.get("/", async (req, res) => {
  try {
    const orders = await bookingModel.getOrders();
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// DELETE /api/booking/:id - Delete an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await bookingModel.deleteOrder(id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;
