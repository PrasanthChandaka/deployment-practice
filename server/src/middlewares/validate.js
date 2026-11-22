// This function "wraps" the schema and returns a standard Express middleware
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation Error",
      errors: result.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }

  req.body = result.data; // Sets cleaned data to req.body
  next();
};

module.exports = { validate };
