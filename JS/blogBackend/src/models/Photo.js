// src/model/Photo.js

class Photo {
    constructor(path, userId, id = null) {
      this.id = id;  
      this.path = path;
      this.userId = userId;
    }
  
    getId() {
      return this.id;
    }
  
    getPath() {
      return this.path;
    }
  
    getUserId() {
      return this.userId;
    }
  
    setId(id) {
      this.id = id;
    }
  
    setPath(path) {
      this.path = path;
    }
  
    setUserId(userId) {
      this.userId = userId;
    }
  
    static fromDatabase(data) {
      return new Photo(data.path, data.userId, data.id);
    }
  }
  
  module.exports = Photo;