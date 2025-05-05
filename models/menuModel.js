const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  image: String,
  category: { type: String, required: true },
  type: { type: String, enum: ["veg", "non-veg"], default: "veg" }
});

// Cache dynamic models to avoid re-creation
const models = {};

const getMenuModel = (category) => {
  if (!models[category]) {
    models[category] = mongoose.model(category, menuSchema, category.toLowerCase());
  }
  return models[category];
};

module.exports = getMenuModel;
