class Image {
  constructor(id,name, path) {
    this.id = id;
    this.name= name;
    this.path = path;
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }
  setPath(path) {
    this.path = path;
  }
  getName() {
    return this.name;
  }
  getPath() {
    return this.path;
  }



  }

    // Static method
module.exports = Image;