// Import necessary React components, Bootstrap components, and external libraries
import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import FileDownload from 'js-file-download'; // External library for handling file downloads
import './style.scss'; // Custom styling for the component
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useCategoryContext } from './CategoryContext'; // Custom context hook for managing category-related state

// Functional component for listing files in a table
function ListFiles({ category }) {
  // Use the custom context hook to access category-related actions
  const { removeCategory } = useCategoryContext();

  // State variables for managing file-related data and modal visibility
  const [files, setFiles] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [updatedFile, setUpdatedFile] = useState({ description: '' });

  // Event handlers for opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch files from the server when the component mounts or when a file is opened
  useEffect(() => {
    async function fetchFiles() {
      try {
        const apiUrl = `http://localhost:3001/api/files/${category}`;
        const response = await axios.get(apiUrl);
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }

    fetchFiles();
  }, [category]);

  // Event handler for downloading a file
  const handleDownload = async (fileId) => {
    try {
      const apiUrl = `http://localhost:3001/api/files/download/${category}/${fileId}`;
      const response = await axios.get(apiUrl, { responseType: 'blob' });
      FileDownload(response.data, fileId);
      alert('File downloaded successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  // Event handler for handling link clicks on file names
  const handleLinkClick = (e, fileId, description) => {
    if (e.ctrlKey) {
      e.preventDefault();
      setSelectedFile(fileId);
      setUpdatedFile((prev) => {
        return {
          ...prev,
          description: description,
          fileId: fileId,
        };
      });
      handleShow();
    } else {
      handleDownload(fileId);
    }
  };

  // Event handler for updating the description of a file
  const updateFile = (e) => {
    const { value } = e.target;
    setUpdatedFile((prev) => {
      return { ...prev, description: value };
    });
  };

  // Event handler for updating file description
  const handleUpdate = (fileId) => {
    axios
      .put(`/api/files/update/${updatedFile.fileId}`, updatedFile)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };

  // Event handler for deleting a file
  const deleteFile = (fileId) => {
    axios
      .delete(`/api/files/delete/${fileId}`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          const updatedFiles = files.filter((file) => file._id !== fileId);
          setFiles(updatedFiles);
          handleClose();

          // Remove the category if no files are left in the category
          if (updatedFiles.length === 0) {
            removeCategory(category);
          }
        }
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
  };

  // Render the file list table and modal for editing file description
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="file-column" style={{ textAlign: 'left' }}>
              File Name
            </th>
            <th className="description-column" style={{ textAlign: 'center' }}>
              Description
            </th>
            <th className="date-column" style={{ textAlign: 'center' }}>
              Date & Time
            </th>
          </tr>
        </thead>
        <tbody>
          {files &&
            files.map((file) => (
              <tr key={file._id} className='table-row'>
                
                <td >
                  <a
                    href={`http://localhost:3001/api/files/download/${category}/${file._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleLinkClick(e, file._id, file.description)} style={{ float: 'left' }}
                  >
                    <Badge style={{ float: 'right' }} bg="secondary">
                      {file.downloadCount}
                    </Badge>
                    <div>{file.filename}</div>
                  </a>
                </td>
                <td className="description-column" style={{ width: '50%', textAlign: 'center' }}>
                  {typeof file.description === 'string' ? file.description : ''}
                </td>
                <td className="date-column" style={{ position: '50%' }}>
                  <div>{file.date}</div>
                  
                </td>
              
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for editing file description */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Editing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input field for entering a new file description */}
          <input
            type="text"
            placeholder="New_description"
            value={updatedFile.description}
            onChange={updateFile}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Buttons for closing the modal, deleting the file, and updating the description */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => deleteFile(selectedFile)}>
            Delete file
          </Button>
          <Button variant="primary" onClick={() => handleUpdate(updatedFile)}>
            Update description
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Export the ListFiles component for use in other parts of the application
export default ListFiles;
