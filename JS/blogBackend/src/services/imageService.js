// src/services/photoService.js

const fs = require('fs');
const path = require('path');

// Base directory for public user photos
const baseDir = path.join(__dirname, '../../public/userPhotos');

function createUserFolder(user) {
  const folderName = user.getName(); 
  const userFolder = path.join(baseDir, folderName);

  if (!fs.existsSync(userFolder)) {
    fs.mkdirSync(userFolder, { recursive: true });
    console.log(`Folder created for user: ${folderName}`);
  } else {
    console.log(`Folder already exists for user: ${folderName}`);
  }

  return userFolder;
}

async function deleteFolderByName(folderName) {
  const folderPath = path.join(__dirname, '../../public/userPhotos', folderName); // Adjust the path based on your folder structure

  try {
    // Check if the folder exists
    if (fs.existsSync(folderPath)) {
      // Use fs.rm to delete the folder recursively
      await fs.promises.rm(folderPath, { recursive: true, force: true });
      console.log(`Folder ${folderName} deleted successfully.`);
      return `Folder ${folderName} deleted successfully.`;
    } else {
      console.log(`Folder ${folderName} not found.`);
      return `Folder ${folderName} not found.`;
    }
  } catch (error) {
    console.error(`Error deleting folder ${folderName}:`, error);
    return `Error deleting folder ${folderName}.`;
  }
}

module.exports = {
  createUserFolder,
  deleteFolderByName,
};