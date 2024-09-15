// src/services/passwordService.js
const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  const saltRounds = 10; // Define the number of salt rounds for hashing
  return await bcrypt.hash(plainPassword, saltRounds);
}

async function verifyPassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  hashPassword,
  verifyPassword,
};

