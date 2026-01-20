const mongoose = require("mongoose");

const headshotSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    originalImageUrl: {
      type: String,
      required: true,
    },
    generatedImageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Headshot", headshotSchema);
