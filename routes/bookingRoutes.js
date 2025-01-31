const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  deleteBooking,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware"); // Optional for admin routes

// Routes

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     responses:
 *       201:
 *         description: Booking created successfully
 */
router.post("/", authMiddleware, createBooking); // Create a new booking

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings for the logged-in user
 *     responses:
 *       200:
 *         description: A list of user bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", authMiddleware, getUserBookings); // Get all bookings for the logged-in user

/**
 * @swagger
 * /api/bookings/admin:
 *   get:
 *     summary: (Admin-only) Get all bookings
 *     responses:
 *       200:
 *         description: A list of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/admin", authMiddleware, roleMiddleware("admin"), getAllBookings); // Admin-only: Get all bookings

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */
router.delete("/:id", authMiddleware, deleteBooking); // Delete a booking

module.exports = router;
