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

  rename(path, newName) {
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
