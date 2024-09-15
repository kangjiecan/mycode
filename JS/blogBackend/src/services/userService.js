/// src/services/userService.js

const userRepo = require('../repo/userRepo'); // Import the repository functions
const User = require('../model/User'); // Import the User class
const passwordService = require('./passwordService');
const bcrypt = require('bcryptjs');

// Without async keyword
function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10); // bcrypt.hash returns a Promise
}

// Using the function
const result = hashPassword('myPassword');
console.log(result); // Logs: Promise { <pending> }



async function registerUser(name, password) {
  const hashedPassword= await passwordService.hashPassword(password); // Get the last user ID and increment it to generate a new ID
  const lastId = await userRepo.getLastUserId();
  const newId = lastId + 1;

  // Create a new User instance with the new ID, name, and password
  const newUser = new User(newId, name, hashedPassword); // Remember to hash the password in real scenarios
  // Save the new user instance to the database
  await userRepo.saveUserInstance(newUser);

  // Return the new User instance
  return newUser;
}

async function getUserByName(userName) {
  return await userRepo.getUserByName(userName);
}

async function updateUserPassword(userName, newPassword) {
  const hashedPassword = await passwordService.hashPassword(newPassword);
  return await userRepo.updateUserPasswordByUsername(userName, hashedPassword);
}

async function deleteUserByName(userName) {
  return await userRepo.deleteUserByName(userName);
} 






module.exports = {
  registerUser,
  getUserByName,
  updateUserPassword,
  deleteUserByName,

  // other service functions...
};