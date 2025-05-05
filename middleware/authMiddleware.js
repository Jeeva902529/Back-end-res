const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // ✅ Extract token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ Attach user to req.user
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
  }
};