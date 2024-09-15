// src/server.js

const express = require('express');
const app = express();
const port = 3000;

// Correctly import the createUser handler from the userController
const { createUser,deleteUser, getUserInfoByName,updatePassword } = require('./controllers/userController'); // Adjust path as necessary

// Middleware to parse JSON
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define the user creation route
app.post('/api/users/create', createUser);
app.delete('/api/users/delete/:userName', deleteUser) // Ensure the handler is correctly imported
app.get('/api/users/userInfo/:userName', getUserInfoByName);
app.put('/api/users/updatePassword/', updatePassword);
//app.put('/api/users/updatePassword', hangleUpdateUserPassword);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; // Export the app for testing