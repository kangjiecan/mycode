const express = require("express");
const FileService = require("../repos/FileUpload");
const ImageRepo = require("../repos/ImageRepo");
const imageRepo = new ImageRepo();
const fileService = new FileService();

class FileHandler {
  constructor() {
    this.fileService = fileService;
  }

  fileUpload(req, res) {
    this.fileService.upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(400).json({ message: err.message });
      }

      console.log(req.body.filename + " *****");
      console.log("File uploaded:", this.fileService.getStoredFileName());

      try {
        const newImage = await imageRepo.postImage(
          this.fileService.getStoredFileName(),
          this.fileService.getFilePath()
        );

        return res.status(201).json({
          message: "File uploaded and image saved successfully",
          fileName: newImage.name,
          imageId: newImage.id,
        });
      } catch (postImageErr) {
        console.error("Error in postImage:", postImageErr);
        return res
          .status(500)
          .json({ message: "Error saving image information" });
      }
    });
  }

  fileUpdate(req, res) {
    this.fileService.upload.single("file")(req, res, async (err) => {
      if (err) {
        console.error("Error during file upload:", err);
        return res.status(400).json({ message: err.message });
      }

      console.log("File uploaded:", this.fileService.getStoredFileName());
      try {
        await imageRepo.updateImage(
          req.body.oldFileName,
          this.fileService.getStoredFileName(),
          this.fileService.getFilePath()
        );
        return res.status(201).json({
          message: "File uploaded and image updated successfully",
          fileName: this.fileService.getStoredFileName(),
          imageId: req.body.imageId,
        });
      } catch (updateImageErr) {
        console.error("Error in updateImage:", updateImageErr);
        return res
          .status(500)
          .json({ message: "Error updating image information" });
      }

     
    });
  }
}

module.exports = FileHandler;
