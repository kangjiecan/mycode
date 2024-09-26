const fs = require("fs");
const path = require("path");

class FileManager {
  constructor(id, name, path) {
    this.id = id;
    this.name = name;
    this.path = path;
  }

  delfile(path) {
    fs.unlink(this.path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File deleted");
    });
  }

  updatefile(id, path, newName) {
    fs.rename(this.path, path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("File updated");
    });
  }
}

module.exports = FileManager;