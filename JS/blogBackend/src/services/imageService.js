// src/services/imageService.js
const { PrismaClient } = require("@prisma/client");
const Photo = require("../models/Photo");

const prisma = new PrismaClient();

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
  }
}

async function getPhotoById(photoId) {
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });
    return photo ? Photo.fromDatabase(photo) : null;
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  }
}

async function removePhotoById(photoId) {
  try {
    const deletedPhoto = await prisma.photo.delete({
      where: { id: photoId },
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
  }
}

async function getPhotosByUserId(userId) {
  try {
    const photos = await prisma.photo.findMany({
      where: { userId: userId },
    });
    console.log(`Found ${photos.length} photos for user ${userId}`);
    return photos.map(photo => Photo.fromDatabase(photo));
  } catch (error) {
    console.error('Error fetching photos for user:', error);
    throw error;
  }
}



async function getAllImageFromDatabase(skip = 0, take = 50) {
  try {
    const photos = await prisma.photo.findMany({
      skip: skip,
      take: take,
      orderBy: { id: 'desc' },
    });
    console.log(`Retrieved ${photos.length} photos from the database`);
    return photos.map(photo => Photo.fromDatabase(photo));
  } catch (error) {
    console.error('Error fetching all photos from database:', error);
    throw error;
  }
}

async function disconnectPrisma() {
  await prisma.$disconnect();
}

module.exports = {
  uploadPhoto,
  getPhotoById,
  removePhotoById,
  getPhotosByUserId,
  getAllImageFromDatabase,
  disconnectPrisma,
};