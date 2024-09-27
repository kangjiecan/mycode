const Image = require("../models/Image");
const { PrismaClient, Prisma } = require("@prisma/client");

class ImageRepo {
  constructor() {
    this.prisma = new PrismaClient();
  }
  async excistImageCheck(name) {
    try {
      const imageData = await this.prisma.image.findUnique({
        where: { name: name },
      });
      if (!imageData) {
        return false;
      }
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma error: ${error.code}, ${error.meta}`);
        throw new Error(`Database error: ${error.code}`);
      } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw the original error
      }
    }
  }

  async postImage(name, path) {
    try {
      if (await this.excistImageCheck(name)) {
        throw new Error(`Image with name "${name}" already exists`);
      }

      const newImage = await this.prisma.image.create({
        data: {
          name,
          path,
        },
      });
      //console.log(
      //  `${newImage.name} ${newImage.id} from ${newImage.path} saved to database`
      //);
      return newImage;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma error: ${error.code}, ${error.meta}`);
        throw new Error(`Database error: ${error.code}`);
      } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw the original error
      }
    }
  }

  async getImage(name) {
    try {
      const imageData = await this.prisma.image.findUnique({
        where: { name: name },
      });
      if (!imageData) {
        throw new Error(`Image with name "${name}" not found`);
      }
      return imageData;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma error: ${error.code}, ${error.meta}`);
        throw new Error(`Database error: ${error.code}`);
      } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw the original error
      }
    }
  }
  async getAllImages() {
    try {
      const allImages = await this.prisma.image.findMany();
      return allImages;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma error: ${error.code}, ${error.meta}`);
        throw new Error(`Database error: ${error.code}`);
      } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw the original error
      }
    }
  }

  async deleteImage(name) {
    try {
      if (!(await this.excistImageCheck(name))) {
        throw new Error(`Image with name "${name}" does not exists`);
      }
      const deletedImage = await this.prisma.image.delete({
        where: { name: name },
      });
      return deletedImage;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma error: ${error.code}, ${error.meta}`);
        throw new Error(`Database error: ${error.code}`);
      } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw the original error
      }
    }
  }




  async updateImage(name, newName) {
    try {
      if (!(await this.excistImageCheck(name))) {
        throw new Error(`Image with name "${name}" does not exists`);

      }
      else if (await this.excistImageCheck(newName)) {
        throw new Error(`Image with new name "${newName}" already exists`);
      }
      const updatedImage = await this.prisma.image.update({
        where: { name: name },
        data: { name: newName },
      });
      return updatedImage;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error(`Prisma error: ${error.code}, ${error.meta}`);
        throw new Error(`Database error: ${error.code}`);
      } else {
        console.error("Unexpected error:", error);
        throw error; // Re-throw the original error
      }
    }
  }
  async close() {
    await this.prisma.$disconnect();
  }
}

module.exports = ImageRepo;