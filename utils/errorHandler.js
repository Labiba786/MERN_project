// Custom error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`.red.underline.bold); // Log errors to console (better with colors using 'colors' npm package)
  
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Default to 500 if status code is 200
    let message = err.message || "Internal Server Error"; // Default error message
  
    // Handle Mongoose bad ObjectId error
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 400;
      message = "Invalid ID format";
    }
  
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors).map((val) => val.message).join(", ");
    }
  
    // Handle duplicate key error in MongoDB
    if (err.code === 11000) {
      statusCode = 400;
      message = "Duplicate field value entered";
    }
  
    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null, // Show stack trace only in development
    });
  };
  
  // Middleware to handle 404 Not Found routes
  const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  module.exports = { errorHandler, notFound };
  