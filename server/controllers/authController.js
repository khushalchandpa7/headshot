const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "dev_secret_key_123", {
    expiresIn: "30d",
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    credits: 25, // Default credits (Free Trial)
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      credits: user.credits,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
