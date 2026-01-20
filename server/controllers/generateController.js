const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const User = require("../models/User");
const Headshot = require("../models/Headshot");

// AI Webhook URL
const AI_WEBHOOK_URL = "http://localhost:5678/webhook/headshot-generator-agent";

// @desc    Generate a new headshot
// @route   POST /api/generate/create
// @access  Private
const createHeadshot = async (req, res) => {
  try {
    console.log("Create Headshot request received");
    if (!req.file) {
      console.log("No file found in request");
      return res.status(400).json({ message: "No image file uploaded" });
    }
    console.log(
      "File received:",
      req.file.originalname,
      "Path:",
      req.file.path,
    );

    // 1. Check user credits
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new Error("User not found");
    }
    console.log("User credits:", user.credits);
    if (user.credits < 25) {
      fs.unlinkSync(req.file.path);
      return res
        .status(403)
        .json({ message: "Insufficient credits (Minimum 25 required)" });
    }

    // 2. Prepare Form Data for AI Webhook
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    // 3. Proxy Request to AI Agent
    console.log("Proxying request to AI Agent:", AI_WEBHOOK_URL);
    const response = await axios.post(AI_WEBHOOK_URL, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 300000, // 5 minutes timeout (image generation can be slow)
    });

    // 4. Handle Response
    console.log("Response status from AI Agent:", response.status);
    let result = response.data;
    console.log("Raw response data type:", typeof result);

    // Handle case where response is an array
    if (Array.isArray(result) && result.length > 0) {
      console.log("Detected array response, using first element.");
      result = result[0];
    }

    let generatedImageUrl = "";

    // Robust parsing
    if (result.imageUrl) {
      generatedImageUrl = result.imageUrl;
    } else if (result.url) {
      generatedImageUrl = result.url;
    } else if (result.base64) {
      generatedImageUrl = `data:image/png;base64,${result.base64}`;
    } else if (result.image) {
      generatedImageUrl = result.image.startsWith("data:")
        ? result.image
        : result.image.startsWith("http")
          ? result.image
          : `data:image/png;base64,${result.image}`;
    } else if (typeof result === "string" && result.startsWith("http")) {
      generatedImageUrl = result;
    } else {
      const keys =
        typeof result === "object" && result !== null
          ? Object.keys(result)
          : [];
      console.error("Failed to parse image. Available keys:", keys);
      throw new Error(
        `No image found in AI response. Keys received: ${keys.join(", ") || "none"}`,
      );
    }

    // 5. Deduct Credit & Save History
    user.credits -= 25;
    await user.save();

    console.log("Saving headshot history for user:", user._id);
    const headshot = await Headshot.create({
      user: user._id,
      originalImageUrl: "local_upload_placeholder",
      generatedImageUrl: generatedImageUrl,
    });
    console.log("Headshot saved successfully with ID:", headshot._id);

    // cleanup local file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      message: "Headshot generated successfully",
      imageUrl: generatedImageUrl,
      creditsRemaining: user.credits,
    });
  } catch (error) {
    console.error("Generation Error Message:", error.message);
    console.error("Generation Error Stack:", error.stack);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      message: "Generation failed",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      details: error.response?.data || null,
    });
  }
};

module.exports = { createHeadshot };
