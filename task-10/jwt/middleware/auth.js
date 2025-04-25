const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).send("Token is required");

  try {
    const decoded = jwt.verify(token, "sripaada");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
};

module.exports = verifyToken;
