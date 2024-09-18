class User {
  #id;
  #name;
  #password;

  constructor(name, password) {
    this.#id = null;  // Initialize id as null
    this.#name = name;
    this.#password = password;
  }

  // Static method to create a User instance with an ID
  static createWithId(id, name, password) {
    const user = new User(name, password);
    user.#id = id;
    return user;
  }

  // Getters
  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getPassword() {
    return this.#password;
  }

  // Setters
  setId(id) {
    this.#id = id;
  }

  setName(name) {
    this.#name = name;
  }

  setPassword(password) {
    this.#password = password;
  }

  // Method to check password
  checkPassword(password) {
    return this.#password === password;
  }

  // Method to return a sanitized version of the user object
  toJSON() {
    return {
      id: this.#id,
      name: this.#name
      // Note: We don't include the password here
    };
  }
}

module.exports = User;