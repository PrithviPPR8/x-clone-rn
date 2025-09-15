export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // Log route + method + body (avoid logging sensitive headers)
    console.error(`Error in route ${req.method} ${req.originalUrl}`);
    console.error("Request body:", req.body);
    console.error("Error object:", err);
    // If Mongoose validation / duplicate key, log details
    if (err.name === "ValidationError") {
      console.error("Mongoose validation errors:", err.errors);
    }
    if (err.code && err.code === 11000) {
      console.error("Duplicate key error:", err.keyValue);
    }
    next(err);
  });
};
