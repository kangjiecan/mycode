const express = require("express");
const FileService = require("../repos/FileService");

const fileService = new FileService();

class FileHandler {
  constructor() {
    this.fileService = fileService;
  }

  fileUpload(req, res) {
    this.fileService.upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Error in fileUpload:", err);
        return res.status(400).json({ message: err.message });
      }
      return res.status(201).json({
        message: "File uploaded successfully",
        fileName: this.fileService.getStoredFileName(),
      });
    });
  }
}

module.exports = FileHandler;