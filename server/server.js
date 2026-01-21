const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const config = require("./config/config");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/generate", require("./routes/generateRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const PORT = config.port;

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).json({
    message: "Something went wrong on the server",
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

const http = require("http");
const server = http.createServer(app);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Error: Port ${PORT} is already in use.`);
    console.error("Please terminate the existing process and try again.");
    process.exit(1);
  } else {
    console.error("Server Error:", err);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
