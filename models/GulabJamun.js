// Gulab Jamun Model
const mongoose = require("mongoose");

const GulabJamunSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("GulabJamun", GulabJamunSchema);