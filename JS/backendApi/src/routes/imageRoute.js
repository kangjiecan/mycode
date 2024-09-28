// imageRoute.js
const express = require("express");
const ImageControl = require("../handlers/ImageControl");
const imageControl = new ImageControl();
const router = express.Router();
const FileUpLoadControler = require("../handlers/FileUploadControler");
const fileUpLoadControler = new FileUpLoadControler(); // Instantiate correctly

router.get("/api/photo/read/", async (req, res) => {
  await imageControl.getImage(req, res);
});

router.get("/api/photo/all", async (req, res) => {
  await imageControl.getAllImages(req, res);
});

router.delete("/api/photo/delete/", async (req, res) => {
  await imageControl.deleteImage(req, res);
});

router.post("/api/photo/create/", async (req, res) => {
  fileUpLoadControler.fileUpload(req, res);
});

router.put("/api/photo/update", async (req, res) => {
  await fileUpLoadControler.fileUpdater(req, res);
});

module.exports = router;
