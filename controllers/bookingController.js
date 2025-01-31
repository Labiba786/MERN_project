const Booking = require("../models/Booking");
const Property = require("../models/Property");

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { propertyId, checkInDate, checkOutDate, guests, totalAmount } =
      req.body;

    // Ensure the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Create the booking
    const booking = new Booking({
      property: propertyId,
      user: req.user.id, // From authMiddleware
      checkInDate,
      checkOutDate,
      guests,
      totalAmount,
    });

    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error creating booking", error });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      "property",
      "title location price"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Get all bookings (admin-only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate(
      "property user",
      "title name email"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this booking" });
    }

    await booking.remove();
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};
