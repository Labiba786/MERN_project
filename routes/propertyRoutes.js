const express = require("express");
const {
  getAllProperties,
  getPropertyById,
  addProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties with filters
 *     responses:
 *       200:
 *         description: A list of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", getAllProperties); // Public: Get all properties with filters

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     summary: Get a single property by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID
 *     responses:
 *       200:
 *         description: A single property
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/:id", getPropertyById); // Public: Get a single property by ID

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Add a new property
 *     responses:
 *       201:
 *         description: Property created successfully
 */
router.post("/", authMiddleware, addProperty); // Private: Add a new property

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update a property
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID
 *     responses:
 *       200:
 *         description: Property updated successfully
 */
router.put("/:id", authMiddleware, updateProperty); // Private: Update a property

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The property ID
 *     responses:
 *       200:
 *         description: Property deleted successfully
 */
router.delete("/:id", authMiddleware, deleteProperty); // Private: Delete a property

module.exports = router;
