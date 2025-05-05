// Ice Cream Model
const mongoose = require("mongoose");

const IceCreamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("IceCream", IceCreamSchema);