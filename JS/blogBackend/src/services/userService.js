const userRepo = require('../repo/userRepo');
const User = require('../models/User');
const passwordService = require('./passwordService');


async function registerUser(name, password) {
  const hashedPassword = await passwordService.hashPassword(password);
  const newUser = await userRepo.createUser(name, hashedPassword);
  return newUser;
}

async function getUserByName(name) {
  return await userRepo.getUserByName(name);
}

async function updateUserPassword(name, newPassword) {
  const hashedPassword = await passwordService.hashPassword(newPassword);
  return await userRepo.updatePassword(name, hashedPassword);
}

async function deleteUserByName(name) {
  return await userRepo.deleteUserByName(name);
}

module.exports = {
  registerUser,
  getUserByName,
  updateUserPassword,
  deleteUserByName,
};