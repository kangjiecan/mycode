const ImageRepo = require("../repos/ImageRepo");
const Image = require("../models/Image");

class ImageControl {
  constructor() {
    this.imageRepo = new ImageRepo();
  }

  async postImage(req, res) {
    const { name, path } = req.body;
    if (!name || !path) {
      return res.status(400).json({
        message: "Bad Request: 'name' and 'path' are required fields",
      });
    }
    try {
      const newImage = await this.imageRepo.postImage(name, path);
      return res.status(201).json({
        message: `${newImage.name} Id:${newImage.id} from ${newImage.path} successfully saved to database`,
      });
    } catch (error) {
      console.error("Error in postImage:", error);
      return res.status(400).json({ message: error.message });
    }
  }

  async getImage(req, res) {
    const { name } = req.params;
    if (!name) {
      res
        .status(400)
        .json({ message: "Bad Request: 'name' is a required field" });
      return;
    }
    try {
      const image = await this.imageRepo.getImage(name);
      if (image) {
        res.status(201).json({
          id: image.id,
          name: image.name,
          message: `Image ${image.name} ID ${image.id} from ${image.path} successfully retrieved`,
        });
        return {
          id: image.id,
          name: image.name,
          path: image.path,
        };
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    } catch (error) {
      console.error("Error retrieving image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllImages(req, res) {
    try {
      const images = await this.imageRepo.getAllImages();
      res.status(200).json({
        images: images.map((image) => ({
          id: image.id,
          name: image.name,
          path: image.path,
        })),
      });
    } catch (error) {
      console.error("Error retrieving images:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteImage(req, res) {
    const { name } = req.params;
    console.log(name);
    if (!name) {
      res
        .status(400)
        .json({ message: "Bad Request: 'name' is a required field" });
      return;
    }
    try {
      await this.imageRepo.deleteImage(name);
      res
        .status(200)
        .json({ message: `Image ${name} was successfully deleted` });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateImage(req, res) {
    const { name, newName } = req.body;
    if (!name || !newName) {
      res.status(400).json({
        message: "Bad Request: 'name' and 'newName' are required fields",
      });
      return;
    }
    try {
      const image = await this.imageRepo.updateImage(name, newName);
      res.status(200).json({
        id: image.id,
        name: image.name,
        path: image.path,
      });
    } catch (error) {
      console.error("Error updating image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
module.exports = ImageControl;
