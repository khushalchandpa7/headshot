const dotenv = require("dotenv");
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/headshot",
  jwtSecret:
    process.env.JWT_SECRET || "dev_secret_key_123_change_this_for_prod",
  aiAgentUrl:
    process.env.AI_AGENT_URL ||
    "http://localhost:5678/webhook/headshot-generator-agent",
};

module.exports = config;
