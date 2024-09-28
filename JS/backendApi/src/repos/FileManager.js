const { json } = require("express");
const fs = require("fs");
const path = require("path");

class FileManager {
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  delfile() {
    fs.unlink(this.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File deleted");
    });
  }

  rename(oldPath, newName) {
    // Extract the directory from the old path
    const directory = path.dirname(oldPath);
    
    const newPath = path.join(directory, newName);
    console.log("new path" + newPath);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error("Error renaming file:", err);
        return;
      }
    });
    this.name = newName;
    this.path = newPath;

    return new FileManager(newName, newPath);
  }
}

module.exports = FileManager;
