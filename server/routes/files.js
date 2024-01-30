// Import necessary libraries
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const File = require('../models/File'); // Import the File model

// Configure multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for file uploads based on the category parameter or use 'defaultFolder' as a default
    const category = req.params.category || 'defaultFolder';
    const folderPath = path.join('uploads', category);

    // Create the folder if it does not exist
    if (!fs.existsSync(folderPath)) {
      try {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`Folder created: ${folderPath}`);
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }

    cb(null, folderPath); // Callback to indicate the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Callback to indicate the file name
  },
});

// Initialize multer with the configured storage
const upload = multer({ storage: storage });

// Handle POST request for file upload
router.post('/:category', upload.single('file'), async (req, res) => {
  // Handle file upload into the specified folder
  const existingFile = await File.findOne({ category: req.params.category });
  let uploadCount = 1;

  if (existingFile) {
    uploadCount = existingFile.uploadCount + 1;

    // Update uploadCount for existing files in the same category
    await File.updateMany(
      { category: req.params.category },
      { $set: { uploadCount } }
    );
  }

  // Create a new File document with uploaded file information and save it to the database
  const fileData = new File({
    filename: req.file.originalname,
    category: req.params.category,
    description: req.body.description,
    date: req.body.date,
    downloadCount: req.body.downloadCount,
    uploadCount,
  });

  console.log({ fileData });

  try {
    await fileData.save();
    return res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.log('Error uploading file', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle GET request to retrieve uploadCount for a specific category
router.get('/uploadCount/:category', async (req, res) => {
  // Retrieve uploadCount for the specified category
  const category = req.params.category;
  const file = await File.findOne({ category: category });

  if (!file) {
    return res.status(404).json({ error: 'No files found in specified category' });
  }

  const uploadCount = file.uploadCount;
  res.status(200).json(uploadCount);
});

// Handle GET request to retrieve files in a specific category
router.get('/:category', async (req, res) => {
  // Retrieve files in the specified category from the database
  const category = req.params.category;
  const folderPath = path.join('uploads', category);

  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  const files = fs.readdirSync(folderPath);

  if (files.length === 0) {
    return res.status(404).json({ error: 'No files found in the specified category' });
  }

  try {
    const files = await File.find({ category: category });
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Handle PUT request to update file description
router.put('/update/:fileId', async (req, res) => {
  // Update the description of a specific file
  const fileId = req.params.fileId;
  const description = req.body.description;

  try {
    const updatedFile = await File.findByIdAndUpdate({ _id: fileId }, { description: description });

    if (!updatedFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.status(200).json({ message: 'File updated successfully' });
  } catch (error) {
    console.error('Error updating file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle DELETE request to delete a specific file
router.delete('/delete/:fileId', async (req, res) => {
  // Delete a specific file and update uploadCount
  const fileId = req.params.fileId;

  try {
    const deletedFile = await File.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    const category = deletedFile.category;
    const uploadCount = deletedFile.uploadCount - 1;

    // Update uploadCount for remaining files in the same category
    await File.updateMany(
      { category: deletedFile.category },
      { $set: { uploadCount } }
    );

    // Delete the file physically from the folder
    const filePath = path.join('uploads', category, deletedFile.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file' });
      }
      console.log('File deleted successfully:', deletedFile.filename);
    });

    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle GET request to download a specific file
router.get('/download/:category/:fileId', async (req, res) => {
  // Download a specific file from the specified category
  const category = req.params.category;
  const fileId = req.params.fileId;
  const destinationPath = path.join('uploads', category);

  let file = await File.findById(req.params.fileId);

  // Update uploadCount and downloadCount for the file
  if (file.downloadCount === 'Uusi') {
    file.uploadCount = Math.max(0, file.uploadCount - 1);
    file.downloadCount = '';
    await file.save();
  }

  file = await File.findById(req.params.fileId);
  const filePath = path.join(destinationPath, file.filename);
  res.download(filePath); // Trigger file download
});

// Export the router for use in the main application
module.exports = router;

