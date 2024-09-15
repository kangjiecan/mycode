import { Router } from 'express';
const router = Router();

// Import user handlers
import { createUser, deleteUser, getUserInfoByName } from '../handlers/userHandler'; // Adjust path if necessary

// User-related routes
router.post('/users/create', createUser);               // Create a new user
router.delete('/users/delete/:userName', deleteUser);   // Delete a user by userName
router.get('/users/userInfo/:userName', getUserInfoByName);                // Uncomment if needed: Get user details by userId
router.put('/users/updatePassword/:newPassword', UpdatePassword); 

export default router;