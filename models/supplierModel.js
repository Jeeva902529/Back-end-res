const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  name: String,
  status: { type: String, enum: ["Available", "Absent"], default: "Absent" },
});

const Supplier = mongoose.model("Supplier", SupplierSchema);
module.exports = Supplier;
