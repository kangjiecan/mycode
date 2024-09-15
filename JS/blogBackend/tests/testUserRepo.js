// tests/testUpdateAndDeleteUser.js

const { getUserByName, updateUserPasswordByUsername, deleteUserByName } = require("../src/repo/userRepo"); // Ensure correct paths to userRepo.js
const { hashPassword,verifyPassword } = require("../src/services/passwordService"); // Ensure correct path to passwordService.js
const {deleteFolderByName,createUserFolder} = require("../src/services/imageService"); // Ensure the correct path to photoService.js, if needed
const User = require("../src/model/User");
const { registerUser } = require("../src/services/userService");

(async () => {
  const userName = 'JohnDoe'; // The username of the user whose password you want to update
  const newPassword = '12354'; // The new password you want to set
  const newUser = await getUserByName(userName);
  const result=await verifyPassword(newPassword,newUser.getPassword());
  console.log(result);
  


  
})();