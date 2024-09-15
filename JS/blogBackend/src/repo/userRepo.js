// src/repo/userRepo.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const User = require("../model/User");

async function saveUserInstance(newUser) {
  try {
    console.log("Attempting to find existing user...");

    const existingUser = await prisma.user.findUnique({
      where: { name: newUser.getName() },
    });

    if (existingUser) {
      console.error("Error: Username already exists. Please choose a different username.");
      throw new Error("Username already exists. Please choose a different username.");
    }

    console.log("No existing user found, creating new user...");

    const userSave = await prisma.user.create({
      data: {
        id: newUser.getId(),
        name: newUser.getName(),
        password: newUser.getPassword(),
      },
    });

    console.log("User created successfully:", userSave);
    return new User(userSave.id, userSave.name, userSave.password);

  } catch (error) {
    console.error("An error occurred while creating the user:", error.message);
    throw error;  // Ensure the error is propagated
  }
}

async function getUserByName(userName) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: userName,
      },
    });

    if (!user) {
      console.log(`User with name ${userName} not found.`);
      return null;
    }

    return new User(user.id, user.name, user.password);
  } catch (error) {
    console.error(`Error fetching user by name: ${userName}`, error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getLastUserId() {
  try {
    const lastUser = await prisma.user.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    if (!lastUser) {
      console.log("No users found in the database");
      return 0;
    }

    console.log(`Last user ID: ${lastUser.id}`);
    return lastUser.id;
  } catch (error) {
    console.error("Error fetching the last user ID:", error);
    throw error;
  }
}

async function updateUserPasswordByUsername(userName, newPassword) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: userName,
      },
    });

    if (!user) {
      console.log(`User with name ${userName} not found.`);
      return "User not found";
    }

    await prisma.user.update({
      where: {
        name: userName,
      },
      data: {
        password: newPassword,
      },
    });

    return `Password updated successfully for user: ${userName}`;
  } catch (error) {
    console.error(`Error updating password for user ${userName}:`, error);
    return "Error updating password";
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteUserByName(userName) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: userName,
      },
    });

    if (!user) {
      console.log(`User with name ${userName} not found.`);
      return "User not found";
    }

    await prisma.user.delete({
      where: {
        name: userName,
      },
    });

    return `User ${userName} deleted successfully`;
  } catch (error) {
    console.error(`Error deleting user ${userName}:`, error);
    return "Error deleting user";
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  saveUserInstance,
  getLastUserId,
  getUserByName,
  updateUserPasswordByUsername,
  deleteUserByName,
};
