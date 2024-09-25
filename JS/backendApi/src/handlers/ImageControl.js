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
    const id = parseInt(req.params.id, 10);
    if (!id) {
      res
        .status(400)
        .json({ message: "Bad Request: 'id' is a required field" });
      return;
    }
    try {
      const image = await this.imageRepo.getImage(id);
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
    const id = parseInt(req.params.id, 10);
    console.log(id);
    if (!id) {
      res
        .status(400)
        .json({ message: "Bad Request: 'id' is a required field" });
      return;
    }
    try {
      await this.imageRepo.deleteImage(id);
      res
        .status(200)
        .json({ message: `Image ${id} was successfully deleted` });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateImage(req, res) {
    const newName  = req.body.newName;
    const id = parseInt(req.body.id, 10);
    console.log(id);
    console.log(newName);

    if (!id || !newName) {
      res.status(400).json({
        message: "Bad Request: 'id' and 'newName' are required fields",
      });
      return;
    }
    try {
      const image = await this.imageRepo.updateImage(id, newName);
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
}
module.exports = ImageControl;
