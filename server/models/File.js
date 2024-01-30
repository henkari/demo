
 // models/File.js

// Import the mongoose library for MongoDB object modeling
const mongoose = require('mongoose');

// Import the userSchema from the Users module (assuming it is in the same directory)
const userSchema = require('./Users');

// Define the schema for the File model using mongoose.Schema
const fileSchema = new mongoose.Schema({
  filename: String,            // String field for storing the file name
  category: String,            // String field for storing the file category
  description: String,         // String field for storing the file description
  date: String,                // String field for storing the file date
  downloadCount: String,       // String field for storing the file download count
  uploadCount: Number,         // Number field for storing the file upload count
  user: {                      // Reference to the User model
    type: mongoose.Schema.Types.ObjectId,  // Type of the reference (Object ID)
    ref: 'User',                // Name of the referenced model ('User' in this case)
    required: false             // Field is not required, allowing null values
  }
});

// Create and export the mongoose model for the 'File' collection using the defined schema
module.exports = mongoose.model('File', fileSchema);


