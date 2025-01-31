const express = require("express");
const {
  getUserById,
  updateUserProfile,
  deleteUser,
  getAllUsers,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Fetch user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put("/profile", authMiddleware, updateUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Admin can delete users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Admin can get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

module.exports = router;
