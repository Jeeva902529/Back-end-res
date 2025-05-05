const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tableNumber: { type: Number, required: true }, // Add table number field
});

module.exports = mongoose.model("User", userSchema);