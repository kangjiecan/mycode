const fs = require("fs").promises;
const path = require("path");
const imageService = require("../services/imageService");

class ImageHandler {
  constructor(uploadDir) {
    this.uploadDir = uploadDir;
    this.thumbnailDir = path.join(uploadDir, "thumbnails");
  }

  handleUpload = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      const userId = Number(req.body.userId);
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
  
      const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000) + 1}-${req.file.originalname}`; // Fixed template string
      const filePath = path.join(this.uploadDir, fileName);
  
      await fs.writeFile(filePath, req.file.buffer);
  
      const photo = await imageService.uploadPhoto(userId, filePath);
  
      res.status(201).json({
        message: "File uploaded successfully",
        photo: photo,
      });
    } catch (error) {
      console.error("Error in handleUpload:", error);
      res.status(500).json({ error: "File upload failed", details: error.message });
    }
  };

  async getPhotoById(req, res) {
    // Access photoID directly from req.params
    const photoID = Number(req.params.photoID);  // Ensure 'photoID' is correctly accessed

    // Log to verify parameter value
    console.log(`Received request to get photo with id ${photoID}`);

    // Continue with your existing error handling and logic
    try {
      const photo = await imageService.getPhotoById(photoID);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      res.status(200).json(photo);
    } catch (error) {
      console.error(`Error fetching photo with id ${photoID}:`, error);
      res.status(500).json({ error: "Failed to retrieve photo", details: error.message });
    }
  }

  

  async removePhotoById(req, res) {
    const photoID = Number(req.params.photoID);

    console.log(`Received request to delete photo with id ${photoID}`);

    const photo = await imageService.removePhotoById(photoID);

    
        if (!photo) {
          return res.status(404).json({ message: "Photo not found" });
        }
        console.log('${photo.path}'); // Log the photo path
        await fs.unlink(photo.path);
        res.status(200).json({ message: "Photo deleted successfully" });
      } catch (error) {
        console.error(`Error deleting photo with id ${photoId}:`, error);
        res.status(500).json({ error: "Failed to delete photo", details: error.message });
      }
    }
  
  

module.exports = ImageHandler;

