// Idli Model
const mongoose = require("mongoose");

const IdliSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Idli", IdliSchema);