// Import necessary libraries
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Define a function to establish a connection to the MongoDB database
const DBConnection = async () => {
  // Retrieve MongoDB database username and password from environment variables
  const USERNAME = process.env.DB_USERNAME;
  const PASSWORD = process.env.DB_PASSWORD;

  // Create the MongoDB connection URI using the provided username and password
  const mongoURI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.vmk8px3.mongodb.net/?retryWrites=true&w=majority`;

  // Connect to MongoDB using Mongoose
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,          // Use new URL parser
    useUnifiedTopology: true,     // Use new server discovery and monitoring engine
  })
    .then(() => {
      console.log('Connected to MongoDB');  // Log success message if the connection is successful
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);  // Log error message if the connection fails
    });
}

// Export the DBConnection function to be used in other parts of the application
module.exports = DBConnection;
