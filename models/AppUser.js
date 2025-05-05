const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const appUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Add password comparison method
appUserSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("AppUser", appUserSchema);
