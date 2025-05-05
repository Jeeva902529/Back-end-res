// Pastries Model
const mongoose = require("mongoose");

const PastriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Pastries", PastriesSchema);
