// UserRepository.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserRepository {
    // Create a new user
    async createUser(email, password, firstName, lastName) {
        try {
            const user = await prisma.user.create({
                data: {
                    email,
                    password,
                    firstName,
                    lastName
                }
            });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Find a user by email
    async findUserByEmail(email) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            return user;
        } catch (error) {
            console.error('Error finding user:', error);
            throw error;
        }
    }

    // Update the password for a specific user by email
    async updatePassword(email, newPassword) {
        try {
            const user = await prisma.user.update({
                where: { email },
                data: { password: newPassword }
            });
            return user;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    }

    // Get all users (for example purposes)
    async getAllUsers() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error) {
            console.error('Error retrieving users:', error);
            throw error;
        }
    }

    // Find a user by ID
    async findUserById(id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id }
            });
            return user;
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }
}

// Use `export default` to export the class in ES modules
export default UserRepository;