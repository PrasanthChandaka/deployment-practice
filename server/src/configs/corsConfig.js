const allowedOrigin = [
  "http://localhost:3000",
  "http://localhost:5001",
  "https://www.google.com",
  "https://www.bing.com",
  "http://15.252.243.175:5001",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
