const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Property title is required"],
    },
    description: {
        type: String,
        required: [true, "Property description is required"],
    },
    price: {
        type: Number,
        required: [true, "Property price is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
    },
    images: {
        type: [String], // Array of image URLs
        required: [true, "At least one image is required"],
    },
    amenities: {
        type: [String], // Array of amenities
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    availability: {
        type: Boolean,
        default: true, // Indicates if the property is available for booking
    },
    ratings: {
        type: Number,
        default: 0, // Average rating
    },
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
