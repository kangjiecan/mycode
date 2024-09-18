const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import the routes
const userRoutes = require('./routes/allIncommingRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  
app.use(express.static(path.join(__dirname, '..', '..','public')));  


app.use('/', userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app; 