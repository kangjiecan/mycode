class Photo {
  constructor(name, path) {
    this.id = null;
    this.title = title;
    this.uri = uri;
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

  static createPhoto(id, name, path) {
    this.id = id;
    this.name = name;
    this.path = path;

  }
}
    // Static method
