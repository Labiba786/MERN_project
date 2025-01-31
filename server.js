const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes"); // Import property routes
const bookingRoutes = require("./routes/bookingRoutes"); // Import booking routes
const swaggerSetup = require("./swagger"); // Import swagger setup

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Add morgan middleware

// Integrate Swagger
swaggerSetup(app);

// Define your routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes); // Add property routes
app.use("/api/bookings", bookingRoutes); // Add booking routes

// Catch all route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware for 404
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
