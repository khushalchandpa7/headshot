const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middleware/authMiddleware");
const { createHeadshot } = require("../controllers/generateController");

// Configure Multer for temp storage
const upload = multer({ dest: "uploads/" });

router.post("/create", protect, upload.single("image"), createHeadshot);

module.exports = router;
