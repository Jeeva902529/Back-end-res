const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ["veg", "non-veg"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("FoodItem", foodItemSchema);
