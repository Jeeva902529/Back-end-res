const mongoose = require("mongoose")

const FriedRiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  type: { type: String, enum: ["Veg", "Egg", "Chicken", "Shrimp", "Special"] },
  spiceLevel: { type: String, enum: ["Mild", "Medium", "Spicy"] },
  addOns: [{ type: String }],
})

module.exports = mongoose.model("FriedRice", FriedRiceSchema)

