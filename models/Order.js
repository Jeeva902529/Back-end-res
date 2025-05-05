const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  basePrice: { type: Number, required: true },
  addOns: [
    {
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  specialInstructions: { type: String },
  totalPrice: { type: Number, required: true },
  tableNumber: { type: Number, required: true }, // ✅ Add tableNumber field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);