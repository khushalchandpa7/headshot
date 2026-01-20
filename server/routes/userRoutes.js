const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Headshot = require("../models/Headshot");

// @desc    Get user data
// @route   GET /api/user/profile
// @access  Private
router.get("/profile", protect, async (req, res) => {
  // req.user is already populated by the 'protect' middleware
  res.json(req.user);
});

// @desc    Get user generation history
// @route   GET /api/user/history
// @access  Private
router.get("/history", protect, async (req, res) => {
  try {
    const history = await Headshot.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
});

module.exports = router;
