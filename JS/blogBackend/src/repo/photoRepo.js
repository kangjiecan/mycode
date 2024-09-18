// src/repo/photoRepo.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Photo = require("../models/Photo");

async function uploadPhoto(userId, imagePath) {
  try {
    const newPhoto = await prisma.photo.create({
      data: {
        path: imagePath,
        userId: userId,
      },
    });
    console.log('New photo created:', newPhoto);
    return Photo.fromDatabase(newPhoto);
  } catch (error) {
    console.error('Error creating photo:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getPhotoById(photoId) {
  try {
    const photo = await prisma.photo.findUnique({
      where: {
        id: photoId,
      },
    });
    if (!photo) {
      console.log(`Photo with id ${photoId} not found`);
      return null;
    }
    return Photo.fromDatabase(photo);
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function removePhotoById(photoId) {
  try {
    const deletedPhoto = await prisma.photo.delete({
      where: {
        id: photoId,
      },
    });
    console.log('Photo record deleted:', deletedPhoto);
    return Photo.fromDatabase(deletedPhoto);
  } catch (error) {
    if (error.code === 'P2025') {
      console.error(`Error: Photo with id ${photoId} not found`);
      return null;
    }
    console.error('Error deleting photo:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getPhotosByUserId(userId) {
  try {
    console.log(`Fetching photos for user with ID ${userId}`);
    const photos = await prisma.photo.findMany({
      where: {
        userId: userId,
      },
    });
    console.log(`Found ${photos.length} photos for user ${userId}`);
    return photos.map(photo => Photo.fromDatabase(photo));
  } catch (error) {
    console.error('Error fetching photos for user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAllImageByID(photoIds) {
    try {
      const photos = await prisma.photo.findMany({
        where: {
          id: {
            in: photoIds
          }
        }
      });
      console.log(`Found ${photos.length} photos for the given IDs`);
      return photos.map(photo => Photo.fromDatabase(photo));
    } catch (error) {
      console.error('Error fetching photos by IDs:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
  async function getAllImageFromDatabase() {
    try {
      const photos = await prisma.photo.findMany();
      console.log(`Retrieved ${photos.length} photos from the database`);
      return photos.map(photo => Photo.fromDatabase(photo));
    } catch (error) {
      console.error('Error fetching all photos from database:', error);
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
  
  module.exports = {
    uploadPhoto,
    getPhotoById,
    removePhotoById,
    getPhotosByUserId,
    getAllImageByID,
    getAllImageFromDatabase
  };