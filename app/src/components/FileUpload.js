// Import necessary React components and libraries
import React, { useState } from 'react';
import axios from 'axios';

// Functional component for handling file upload
function FileUpload({ category }) {
  // State variables for managing file-related data
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [lastModifiedDate, setLastModifiedDate] = useState(null);
  const [downloadCount, setDownloadCount] = useState(''); 

  // Event handler for file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update state with selected file information
      setSelectedFile(file);
      const currentDate = new Date();
      const datePart = currentDate.toLocaleDateString();
      const timePart = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedDateTime = `${datePart} ${timePart}`;
      setLastModifiedDate(formattedDateTime);
      setDownloadCount('Uusi'); // Set download count to 'Uusi'
    } else {
      // Reset state if no file is selected
      setSelectedFile(null);
      setLastModifiedDate(null);
      setDownloadCount('Uusi'); // Set download count to 'Uusi'
    }
  };

  // Event handler for description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Event handler for file upload
  const handleUpload = async () => {
    // Check if a file is selected before uploading
    if (selectedFile === null) {
      alert('Please select a file before uploading.');
      return;
    }

    // Create a FormData object to send file data
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('description', description);
    formData.append('date', lastModifiedDate);
    formData.append('downloadCount', downloadCount);

    try {
      // Update the API endpoint URL based on the category
      const apiUrl = `http://localhost:3001/api/files/${category}`;
      // Send a POST request to the server with file data
      await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Display success message and reload the page
      alert('File uploaded successfully');
      window.location.reload();
    } catch (error) {
      // Log and handle errors that occur during the upload
      console.error('Error uploading file:', error);
    }
  };

  // Render the file upload form
  return (
    <div>
      {/* File input for selecting a file */}
      <input type="file" onChange={handleFileChange} />

      {/* Text input for entering file description */}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      {/* Button to trigger the file upload */}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

// Export the FileUpload component for use in other parts of the application
export default FileUpload;





