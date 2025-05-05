const express = require("express");
const { registerUser, loginUser, logoutUser, checkAuth } = require("../controllers/loginController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/auth", checkAuth);

// ✅ Export using CommonJS
module.exports = router;
