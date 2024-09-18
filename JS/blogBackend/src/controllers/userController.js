const userService = require('../services/userService');
const {
  registerUser,
  deleteUserByName,
  updateUserPassword,
  getUserByName,
} = require("../services/userService");
const { hashPassword } = require("../services/passwordService");

class UserController {
  async createUser(req, res) {
    const { name, password } = req.body;
    try {
      console.log(`Received request to create user: ${name}`);
      const result = await registerUser(name, password);
      console.log(
        `User ${result.getName()} created successfully with ID ${result.getId()}`
      );
      return res.status(201).json({
        message: `User ${result.getName()} created successfully`,
        userId: result.getId(),
      });
    } catch (error) {
      console.error("Error while creating user:", error.message);
      const statusCode = error.message.includes("already exists") ? 409 : 400;
      return res.status(statusCode).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    const userName = req.params.userName;
    try {
      console.log(`Received request to delete user: ${userName}`);
      const result = await deleteUserByName(userName);
      if (result) {
        console.log(`User ${userName} deleted successfully`);
        return res
          .status(200)
          .json({ message: `User ${userName} deleted successfully` });
      } else {
        console.log(`User ${userName} not found`);
        return res.status(404).json({ message: `User ${userName} not found` });
      }
    } catch (error) {
      console.error("Error while deleting user:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async getUserInfoByName(req, res) {
    const userName = req.params.userName;
    try {
      console.log(`Received request to get user info for user: ${userName}`);
      const result = await getUserByName(userName);
      console.log(result);
      if (result) {
        const userId = result.getId();
        const userPassword = result.getPassword();
        console.log(
          `User ${userName} found with ID ${userId} and password ${userPassword}`
        );
        return res.status(200).json({
          message: `User ${userName} found with ID ${userId} and password ${userPassword}`,
        });
      } else {
        console.log(`User ${userName} not found`);
        return res.status(404).json({ message: `User ${userName} not found` });
      }
    } catch (error) {
      console.error("Error while getting user info:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  async updatePassword(req, res) {
    const { name, newPassword } = req.body;
    try {
      console.log(`Received request to update password for user: ${name}`);
      const result = await updateUserPassword(name, newPassword);
      if (result) {
        console.log(`Password updated successfully for user: ${name}`);
        res
          .status(200)
          .json({
            message: `Password updated successfully for user: ${name}`,
          });
      } else {
        console.log(`User ${name} not found`);
        res.status(404).json({ message: `User ${name} not found` });
      }
    } catch (error) {
      console.error("Error while updating password:", error.message);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();