require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    return res.status(401).json({ message: "Authorization header missing" }); //unothorized
  }
  if (!authHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        //forbiden
        message:
          err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
