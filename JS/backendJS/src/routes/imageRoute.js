const express = require("express");
const ImageRepo = require("../repos/ImageRepo");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Fallback to localhost


const router = express.Router();

// Initialize shared services
const imageRepo = new ImageRepo();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = req.body.uploadDir || path.join(__dirname, "../../public/images");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage: storage });

// Utility functions to handle file paths
function getFilePath(file) {
  return path.join(file.destination, file.filename); // Use dynamic destination
}

// Function to delete a file
function delfile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted");
  });
}

// Function to rename a file
function rename(oldPath, newName) {
  const directory = path.dirname(oldPath);
  const newPath = path.join(directory, newName);
  console.log("New path: " + newPath);

  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
      return;
    }
  });

  return {
    name: newName,
    path: newPath,
  };
}

// Function to handle posting an image
async function postImage(req, res) {
  const { name, path } = req.body;
  if (!name || !path) {
    return res.status(400).json({
      message: "Bad Request: 'name' and 'path' are required fields",
    });
  }
  try {
    const newImage = await imageRepo.postImage(name, path);
    return res.status(201).json({
      message: `${newImage.name} Id:${newImage.id} from ${newImage.path} successfully saved to database`,
    });
  } catch (error) {
    console.error("Error in postImage:", error);
    return res.status(400).json({ message: error.message });
  }
}

// Function to handle retrieving an image by ID
async function getImage(req, res) {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id) || id < 0) {
    return res
      .status(400)
      .json({ message: "Bad Request: 'id' must be a valid number" });
  }

  try {
    const image = await imageRepo.getImage(id);
    if (image) {
      return res.status(201).json({
        message: `Image ${image.name} ID ${image.id} from ${image.path} successfully retrieved`,
        id: image.id,
        name: image.name,
        path: `${BASE_URL}/images/${image.name}`, // Construct the full URL using BASE_URL
        title: image.title,
        description: image.description,
      });
    } else {
      res.status(404).json({ message: "Image not found" });
    }
  } catch (error) {
    if (error.message.includes("Image with ID")) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error retrieving image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

// Function to handle retrieving all images
async function getAllImages(req, res) {
  try {
    const images = await imageRepo.getAllImages();
    
    // Ensure BASE_URL is loaded from the environment

    // Map through the images and construct the correct path
    res.status(200).json({
      images: images.map((image) => ({
        id: image.id,
        name: image.name,
        path: `${BASE_URL}/images/${image.name}`, // Construct the full URL using BASE_URL
        title: image.title,
        description: image.description,
      })),
    });
  } catch (error) {
    console.error("Error retrieving images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to handle deleting an image by ID
async function deleteImage(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    res.status(400).json({ message: "Bad Request: 'id' is a required field" });
    return;
  }
  try {
    const imageToDelete = await imageRepo.getImage(id);
    delfile(imageToDelete.path);
    await imageRepo.deleteImage(imageToDelete.id);
    res.status(200).json({
      message: `Image ${id} was successfully deleted from database and unlinked`,
    });
  } catch (error) {
    if (error.message.includes("Image with ID")) {
      res.status(404).json({ message: error.message });
    } else {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

// Function to handle updating an image
async function updateImage(req, res) {
  const newName = req.body.newName;
  const id = parseInt(req.body.id, 10);
  if (isNaN(id) || !newName) {
    res.status(400).json({
      message: "Bad Request: 'id' and 'newName' are required fields",
    });
    return;
  }
  try {
    const image = await imageRepo.updateImage(id, newName);
    res.status(200).json({
      id: image.id,
      name: image.name,
      path: image.path,
      message: `200, Image ${image.name} ID ${image.id} from ${image.path} successfully updated`,
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// File upload function with multer
async function fileUpload(req, res) {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const fileName = file.filename;
    const filePath = getFilePath(file);
    const newName = req.body.customName
      ? `${req.body.customName}-${fileName}`
      : fileName;
    const title = req.body.title;
    const description = req.body.description;  

    try {
      let message = `File ${fileName} uploaded successfully`;

      if (!req.body.customName) {
        message += ". Please set customName in the request body next time in order to better manage the file name";
      }

      const renamedFile = rename(filePath, newName);

      await imageRepo.postImage(renamedFile.name, renamedFile.path, title, description);  

      return res.status(201).json({
        message: message,
        uploaded_fileName: renamedFile.name,
        filePath: renamedFile.path,
      });
    } catch (error) {
      console.error("Error saving file information:", error);
      delfile(filePath); // Clean up the file in case of error
      return res.status(500).json({
        message: "Error saving file information",
        error: error.message,
      });
    }
  });
}

// File updater function with multer
async function fileUpdater(req, res) {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    //check jason
   /* if (!req.body.existingFileName) {
      return res.status(400).json({ message: "existingFileName is required" });
    }*/

    try {
      const file = req.file;
      const id = parseInt(req.body.id);
      const filePath = getFilePath(file);
//check if the file which to be replaced exists
      const fileToReplace = await imageRepo.getImage(
        id
      );
      const fileName=file.filename;

      await imageRepo.updateImage(id ,filePath,fileName);

      delfile(fileToReplace.path);

      return res.status(200).json({
        message: `File ${fileName} updated successfully`,
        filePath: filePath,
      });
    } catch (error) {
      if (error.message.includes("Image with name")) {
        //delfile(filePath); // Clean up
        return res.status(404).json({ message: error.message });
      }
      console.error("Error updating file information:", error);
      return res.status(500).json({
        message: "Error updating file information",
        error: error.message,
      });
    }
  });
}

async function updateImageInfo(req,res){
  const id = parseInt(req.body.id, 10);
  const title = req.body.title;
  const description = req.body.description;
  if (isNaN(id) || !title || !description) {
    res.status(400).json({
      message: "Bad Request: 'id', 'title' and 'description' are required fields",
    });
    return;
  }
  
    const image = await imageRepo.updateImageInfo(id, title, description);
    res.status(200).json({
      id: image.id,
      name: image.name,     
      title: image.title, 
      description: image.description,
      message: `200, Image ${image.name} ID ${image.id} from ${image.path} successfully updated`,
    });
  }          

router.get("/api/photo/read/:id", getImage);
router.get("/api/photo/all", getAllImages);
router.delete("/api/photo/delete/:id", deleteImage);
router.post("/api/photo/create/", fileUpload);
router.put("/api/photo/update", fileUpdater);
router.put("/api/photo/updateInfo", updateImageInfo);

module.exports = router;
