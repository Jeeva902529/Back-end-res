const express = require("express");
const { authUser } = require("../controllers/authController");

const router = express.Router();

router.post("/auth", authUser); // Handles both login & signup

module.exports = router;
