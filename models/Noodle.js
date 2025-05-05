// Noodles Model (Noodle.js)
const mongoose = require("mongoose");

const NoodleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Noodle", NoodleSchema);