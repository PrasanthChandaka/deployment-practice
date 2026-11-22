const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  // Guard against undefined request origins (e.g., Postman or internal server fetches)
  const origin = req.headers.origin || "no-origin";

  // Keep your exact logging format intact
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${origin}`,
    "errorLog.log",
  );

  // Keep internal stack traces strictly on your server console
  console.error(err.stack);

  // FIX: If res.statusCode is 200, force it to 500 (Internal Server Error)
  let status = err.status || 500;
  if (status === 200 && res.statusCode !== 200) {
    status = res.statusCode;
  } else if (res.statusCode && res.statusCode !== 200) {
    status = res.statusCode;
  }

  // Production Payload Sanitization Architecture
  const isProduction = process.env.NODE_ENV === "production";

  // Custom or operational errors can pass messages safely.
  // Database or native runtime engine crashes should be masked in production.
  const clientMessage =
    isProduction && status === 500
      ? "An unexpected internal server error occurred."
      : err.message;

  return res.status(status).json({
    message: clientMessage,
  });
};

module.exports = errorHandler;
