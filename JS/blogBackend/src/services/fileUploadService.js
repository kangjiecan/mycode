// src/services/uploadService.js

const multer = require('multer');
const path = require('path');

// Define the storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the folder to save uploaded files
    cb(null, path.join(__dirname, '../../public/userPhotos')); // Adjust the path as necessary
  },
  filename: function (req, file, cb) {
    // Save files with a timestamp and the original file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer upload instance with storage configuration and file size limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
}).single('file'); // Use .single('file') for single file uploads with the form key 'file'

// Middleware function to handle file uploads
function uploadFile(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      return res.status(400).send(`Multer Error: ${err.message}`);
    } else if (err) {
      // Handle other errors
      return res.status(500).send(`Server Error: ${err.message}`);
    }
    // Proceed to the next middleware or route handler if successful
    next();
  });
}

module.exports = {
  uploadFile,
};