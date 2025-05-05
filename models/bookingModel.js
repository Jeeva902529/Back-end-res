const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  foodName: String,
  basePrice: Number,
  addOns: [String],
  specialInstructions: String,
  totalPrice: Number,
  tableNumber: Number,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("orders", bookingSchema); // "orders" collection

module.exports = {
  getOrders: async () => {
    try {
      return await Booking.find().sort({ createdAt: -1 }); // Fetch all orders sorted by latest
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },
  deleteOrder: async (id) => {
    try {
      await Booking.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  },
};
