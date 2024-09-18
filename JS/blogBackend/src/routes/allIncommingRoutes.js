const express = require('express');
const router = express.Router();
const multer = require('multer');
const ImageHandler = require('../controllers/ImageHandler');
const UserController = require('../controllers/UserController');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Initialize ImageHandler
const imageHandler = new ImageHandler('./public/userImages');

// User routes
router.post('/users/create', UserController.createUser);
router.delete('/users/delete/:userName', UserController.deleteUser);
router.get('/users/userInfo/:userName', UserController.getUserInfoByName);
router.put('/users/updatePassword', UserController.updatePassword);

// Image upload route
router.post('/photos/upload', upload.single('image'), imageHandler.handleUpload);
// Route definition with the correct parameter name
router.get('/photos/:photoID', imageHandler.getPhotoById);
router.delete('/photos/delete/:photoID', imageHandler.removePhotoById);



module.exports = router;