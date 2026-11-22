const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  if (!user?.username || !user?.roles) {
    throw new Error("Invalid user data for access token");
  }

  return jwt.sign(
    {
      UserInfo: {
        id: user.id || user._id, // Guard against both Mongoose ObjectId and string variants
        username: user.username,
        roles: user.roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
};

const generateRefreshToken = (user) => {
  if (!user?.username) {
    throw new Error("Invalid user data for refresh token");
  }

  // Keep this at the root payload level safely
  return jwt.sign(
    { username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
