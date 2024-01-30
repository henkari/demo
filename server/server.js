// Import necessary libraries and modules
const express = require('express'); // Express.js for building the web server
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const cors = require('cors'); // CORS middleware for handling cross-origin requests
const fileRoutes = require('./routes/files'); // Import file routes
const authRoute = require('./routes/authRoute') // Import authentication routes
const DBConnection = require('./database/db.js'); // Import the database connection function
const dotenv = require('dotenv'); // Dotenv for loading environment variables
const app = express(); // Create an instance of the Express application

// Set the port for the server to listen on, either from environment variable or default to 3001
dotenv.config();
const port = process.env.PORT || 3001;

// Enable CORS middleware to handle cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use the authentication routes
app.use("/", authRoute);

// Use the file routes for handling file-related operations
app.use('/api/files', fileRoutes);

// Establish a connection to the MongoDB database
DBConnection();

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
