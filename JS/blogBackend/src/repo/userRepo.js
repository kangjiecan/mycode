const { PrismaClient } = require("@prisma/client");
const User = require("../models/User"); // Adjust the path as needed
const prisma = new PrismaClient();

class UserRepo {
 
    async createUser(name, password) {
      try {
        // First, check if the username already exists
        const existingUser = await prisma.user.findUnique({
          where: { name },
        });
  
        if (existingUser) {
          throw new Error('Username already exists');
        }
  
        // Create the new user without specifying the ID
        await prisma.user.create({
          data: {
            name,
            password,
          },
        });
  
        // Retrieve the created user to get the auto-generated ID
        const createdUser = await prisma.user.findUnique({
          where: { name },
        });
  
        if (!createdUser) {
          throw new Error('Failed to retrieve created user');
        }
  
        // Return a User instance
        return User.createWithId(createdUser.id, createdUser.name, createdUser.password);
      } catch (error) {
        console.error('Error in createUser:', error);
        throw error;
      }
    }

  async updatePassword(name, newPassword) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { name },
      });
      if (!existingUser) {
        throw new Error("User not found");
      }

      const updatedUser = await prisma.user.update({
        where: { name },
        data: { password: newPassword },
      });
      return User.createWithId(
        updatedUser.id,
        updatedUser.name,
        updatedUser.password
      );
    } catch (error) {
      console.error("Error in updatePassword:", error);
      throw error;
    }
  }

  async getUserByName(name) {
    try {
      const user = await prisma.user.findUnique({
        where: { name },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return User.createWithId(user.id, user.name, user.password);
    } catch (error) {
      console.error("Error in getUserByName:", error);
      throw error;
    }
  }

  async deleteUserByName(name) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { name },
      });
      if (!existingUser) {
        throw new Error("User not found");
      }
      const deletedUser = await prisma.user.delete({
        where: { name },
      });
      return User.createWithId(
        deletedUser.id,
        deletedUser.name,
        deletedUser.password
      );
    } catch (error) {
      console.error("Error in deleteUserByName:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.prisma.$disconnect();
      console.log('Successfully disconnected from the database');
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
      throw error;
    }
  }
}
  




module.exports = new UserRepo();
