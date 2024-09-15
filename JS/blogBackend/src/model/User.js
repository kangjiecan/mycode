// src/model/User.js
const userRepo = require('../repo/userRepo'); // Ensure correct path


class User {
  #id;
  #name;
  #password;

  constructor(id, name, password) {
    this.#id = id;
    this.#name = name;
    this.#password = password;
  }

  displayInfo() {
    console.log(`User ID: ${this.#id}, Name: ${this.#name}`);
  }

  checkPassword(inputPassword) {
    return this.#password === inputPassword;
  }

  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  setName(newName) {
    this.#name = newName;
  }

  setPassword(newPassword) {
    this.#password = newPassword;
  }

  getPassword() {
    return this.#password;
  }

}

module.exports = User; // Correctly export the User class