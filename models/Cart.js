const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  specialInstructions: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", CartSchema);
