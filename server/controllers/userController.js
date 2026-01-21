const User = require("../models/User");
const Headshot = require("../models/Headshot");

// @desc    Get user data
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  // req.user is already populated by the 'protect' middleware
  res.json(req.user);
};

// @desc    Get user generation history
// @route   GET /api/user/history
// @access  Private
const getUserHistory = async (req, res) => {
  try {
    const history = await Headshot.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history" });
  }
};

module.exports = {
  getUserProfile,
  getUserHistory,
};
