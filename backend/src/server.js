require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const {
  notFound,
  errorHandler,
} = require("./middleware/errorHandler");

const app = express();

connectDB();

/*
|--------------------------------------------------------------------------
| CORS Configuration
|--------------------------------------------------------------------------
*/

const configuredOrigins = (process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

const allowedOrigins = new Set([
  // Local development
  "http://localhost:5173",
  "http://127.0.0.1:5173",

  // Production Vercel frontend
  "https://mini-social-post-application-black.vercel.app",

  // Additional origins from environment variable
  ...configuredOrigins,
]);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests that do not contain an Origin header
    // (for example, curl, Render health checks, server-to-server requests).
    if (!origin) {
      return callback(null, true);
    }

    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.has(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(
      new Error(`CORS blocked origin: ${origin}`)
    );
  },

  methods: [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,

  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Explicitly handle browser preflight requests
app.options("*", cors(corsOptions));

/*
|--------------------------------------------------------------------------
| Body Parsers
|--------------------------------------------------------------------------
*/

app.use(express.json({ limit: "5mb" }));

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Static Files
|--------------------------------------------------------------------------
*/

// Serve locally uploaded images.
// Cloudinary can be used in production if configured.
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "..", "uploads")
  )
);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/posts", postRoutes);

/*
|--------------------------------------------------------------------------
| Error Handling
|--------------------------------------------------------------------------
*/

app.use(notFound);

app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});