// Middleware to check user roles
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      try {
        // Check if the user role exists in the token payload
        if (!req.user || req.user.role !== requiredRole) {
          return res.status(403).json({ message: "Access denied. Insufficient permissions." });
        }
        next(); // Proceed to the next middleware or controller
      } catch (error) {
        res.status(500).json({ message: "Server error in role authorization.", error });
      }
    };
  };
  
  module.exports = roleMiddleware;
  