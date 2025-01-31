const Property = require("../models/Property");

// @desc Get all properties with optional filters
// @route GET /api/properties
// @access Public
const getAllProperties = async (req, res) => {
  const { location, minPrice, maxPrice, amenities } = req.query;

  try {
    // Dynamic filters
    let filters = {};
    if (location) filters.location = { $regex: location, $options: "i" };
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (amenities) filters.amenities = { $all: amenities.split(",") };

    const properties = await Property.find(filters).populate(
      "host",
      "name email"
    );
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get a single property by ID
// @route GET /api/properties/:id
// @access Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "host",
      "name email"
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Add a new property
// @route POST /api/properties
// @access Private (host only)
const addProperty = async (req, res) => {
  const { title, description, price, location, images, amenities } = req.body;
  try {
    const property = new Property({
      title,
      description,
      price,
      location,
      images,
      amenities,
      host: req.user._id,
    });
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update a property
// @route PUT /api/properties/:id
// @access Private (host only)
const updateProperty = async (req, res) => {
  const { title, description, price, location, images, amenities } = req.body;
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;
    property.images = images || property.images;
    property.amenities = amenities || property.amenities;

    const updatedProperty = await property.save();
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a property
// @route DELETE /api/properties/:id
// @access Private (host only)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await property.remove();
    res.status(200).json({ message: "Property removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  deleteProperty,
};
