// Brownies Model
const mongoose = require("mongoose");

const BrowniesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Brownies", BrowniesSchema);