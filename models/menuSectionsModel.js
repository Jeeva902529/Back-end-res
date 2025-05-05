const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true }
});

const MenuSection = mongoose.model("MenuSection", sectionSchema);

module.exports = MenuSection;
