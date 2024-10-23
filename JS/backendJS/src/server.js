require('dotenv').config(); // Load environment variables from .env

const express = require("express");
const cors = require("cors"); // Import CORS
const app = express();
const port = 3000;
const imageRoute = require("./routes/imageRoute");
const path = require("path");

console.log('Serving static files from:', path.join(__dirname, '../public/images'));

app.use('/images', express.static(path.join(__dirname, '../public/images')));
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; 
// Fallback to localhost



// Enable CORS for all routes
app.use(cors()); // Allow all origins by default (use with caution in production)

// Middleware to handle JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling for invalid JSON payloads in POST/PUT requests
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    express.json()(req, res, (err) => {
      if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
          message: "Bad Request: Invalid JSON",
          error: err.message,
        });
      }
      next();
    });
  } else {
    next();
  }
});

// Use your image routes
app.use("/", imageRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;