const { registerUser, deleteUserByName, updateUserPassword, getUserByName } = require('../services/userService');
const { hashPassword } = require('../services/passwordService');
// Handler for creating a new user
const createUser = async (req, res) => {
  const { userName, password } = req.body;

  try {
    console.log(`Received request to create user: ${userName}`);

    const result = await registerUser(userName, password);

    console.log(`User ${result.getName()} created successfully with ID ${result.getId()}`);

    return res.status(201).json({
      message: `User ${result.getName()} created successfully`,
      userId: result.getId(),
    });

  } catch (error) {
    console.error("Error while creating user:", error.message);
    // Consider using 409 Conflict for username exists, or 500 for internal server errors
    const statusCode = error.message.includes('already exists') ? 409 : 400;
    return res.status(statusCode).json({ error: error.message });
  }
};

// Handler for deleting a user
const deleteUser = async (req, res) => {  
  const userName = req.params.userName;

  try {
    console.log(`Received request to delete user: ${userName}`);

    const result = await deleteUserByName(userName);

    if (result) {
      console.log(`User ${userName} deleted successfully`);
      return res.status(200).json({ message: `User ${userName} deleted successfully` });
    } else {
      console.log(`User ${userName} not found`);
      return res.status(404).json({ message: `User ${userName} not found` });
    }

  } catch (error) {
    console.error("Error while deleting user:", error.message);
    // Consider using 500 for server errors
    return res.status(500).json({ error: error.message });
  }
};



// Handler for getting user info by username

// Handler for getting user info by username
const getUserInfoByName = async (req, res) => {
  const userName = req.params.userName;

  try {
    console.log(`Received request to get user info for user: ${userName}`);

    // Fetch user info using the service function
    const result = await getUserByName(userName);

    console.log(result); // Debugging: Check what result actually contains

    if (result) {
      // If result is an object, use direct property access
      const userId = result.getId(); // or result.getId() if it's a class instance
      const userPassword = result.getPassword(); // or result.getPassword() if it's a class instance

      console.log(`User ${userName} found with ID ${userId} and password ${userPassword}`);
      return res.status(200).json({ 
        message: `User ${userName} found with ID ${userId} and password ${userPassword}`
      });
    } else {
      console.log(`User ${userName} not found`);
      return res.status(404).json({ message: `User ${userName} not found` });
    }

  } catch (error) {
    console.error("Error while getting user info:", error.message);
    return res.status(500).json({ error: error.message }); // Handle server errors
  }
}

const updatePassword = async (req, res) => {
  const { userName, newPassword } = req.body;


  try {
    console.log(`Received request to update password for user: ${userName}`);

    const result = await updateUserPassword(userName, newPassword);

    if (result) {
      console.log(`Password updated successfully for user: ${userName}`);
      res.status(200).json({ message: `Password updated successfully for user: ${userName}` });
    } else {
      console.log(`User ${userName} not found`);
      res.status(404).json({ message: `User ${userName} not found` });
    }

  } catch (error) {
    console.error("Error while updating password:", error.message);
    res.status(400).json({ error: error.message });
  }
}
/*

const hangleUpdateUserPassword = async (req, res) => {  
  const userName = req.params.userName;
  const newPasswordReceived = req.body.newPassword;
  const newPassword = await passwordService.hashPassword(newPassword);

  try {
    console.log(`Received request to update password for user: ${userName}`);

    const result = await updateUserPassword(userName, newPassword);

    if (result) {
      console.log(`Password updated successfully for user: ${userName}`);
      res.status(200).json({ message: `Password updated successfully for user: ${userName}` });
    } else {
      console.log(`User ${userName} not found`);
      res.status(404).json({ message: `User ${userName} not found` });
    }

  } catch (error) {
    console.error("Error while updating password:", error.message);
    res.status(400).json({ error: error.message });
  }
}
*/




module.exports = { createUser, deleteUser,getUserInfoByName,updatePassword }; 
/*module.exports = { hangleUpdateUserPassword };
module.exports = { getUserByName };*/
