const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  getUserHistory,
} = require("../controllers/userController");

// @desc    Get user data
// @route   GET /api/user/profile
// @access  Private
router.get("/profile", protect, getUserProfile);

// @desc    Get user generation history
// @route   GET /api/user/history
// @access  Private
router.get("/history", protect, getUserHistory);

module.exports = router;
