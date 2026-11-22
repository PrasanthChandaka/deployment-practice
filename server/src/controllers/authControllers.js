const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateRefreshToken,
  generateAccessToken,
} = require("../utils/tokenUtils");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const normalizedUsername = username.toLowerCase().trim();
  const user = await userModel
    .findOne({ usernameNormalized: normalizedUsername })
    .select("+password")
    .exec();

  // If user doesn't exist, is inactive, or has no password field
  if (!user || !user.active || !user.password) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Create clean user utility data transfer object (DTO)
  const userPayload = {
    id: user._id,
    username: user.username,
    roles: user.roles,
  };

  const accessToken = generateAccessToken(userPayload);
  const refreshToken = generateRefreshToken(userPayload);

  res.cookie("token", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    message: "Login successful.",
    accessToken,
    user: userPayload, // Matches structural design requirements
  });
};

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token)
    return res.status(401).json({ message: "Unauthorized." });

  const refreshToken = cookies.token;

  // Verify token via promise wrapper cleanly under Express v5
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) return reject(err); // Hands control directly over to your errorHandler middleware
      resolve(data);
    });
  });

  // Safe lookup using normalized variation extracted from decoded root payload
  const user = await userModel
    .findOne({ usernameNormalized: decoded.username.toLowerCase().trim() })
    .exec();

  if (!user || !user.active) {
    return res.status(403).json({ message: "Forbidden." });
  }

  // FIX: Build structure identically aligning to user payload requirements
  const userPayload = {
    id: user._id,
    username: user.username,
    roles: user.roles,
  };
  const accessToken = generateAccessToken(userPayload);

  return res.json({
    accessToken,
    user: userPayload,
  });
};

const logOut = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(204);

  res.clearCookie("token", COOKIE_OPTIONS);
  return res.status(200).json({ message: "Cookie cleared." });
};

module.exports = { login, logOut, refresh };
