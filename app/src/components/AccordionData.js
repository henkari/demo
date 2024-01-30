// Import necessary React components and styles
import Accordion from 'react-bootstrap/Accordion'; // Bootstrap Accordion component
import FileUpload from './FileUpload'; // Custom FileUpload component
import ListFiles from './ListFiles'; // Custom ListFiles component
import React, { useState, useEffect } from 'react'; // React core functionalities
import Badge from 'react-bootstrap/Badge'; // Bootstrap Badge component
import './style.scss'; // Custom styling for the component

// Functional component for displaying data in an accordion format
function AccordionData({ category }) {
  // Capitalize the first letter of the category for display
  const heading = category.charAt(0).toUpperCase() + category.slice(1);

  // State for storing the file upload count
  const [count, setCount] = useState(0);

  // Fetch and update the file upload count on component mount or when the category changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the file upload count for the specified category from the server
        const response = await fetch(`http://localhost:3001/api/files/uploadCount/${category}`);
        const data = await response.json(); // Parse response as JSON

        // Update the count state if the response is a number
        if (typeof data === 'number') {
          setCount(data);
        }
      } catch (error) {
        // Handle any errors that may occur during the fetch
        console.error('Error fetching file upload count:', error);
      }
    }

    // Call the fetchData function
    fetchData();
  }, [category]); // Re-run the effect when the category changes

  return (
    <div className='accordion'>
      <div class='card'>
        
        {/* Bootstrap Accordion component */}
        <Accordion>
          <Accordion.Item eventKey="0">
          {/* Accordion header */}
          <Accordion.Header>
            <div>{heading}</div>
              {count > 0 && (
              // Display a badge with the file upload count if count is greater than 0
              <Badge style={{ position: 'relative', top: '-10px' }} bg="secondary">
                {count}
              </Badge>
                )}
          </Accordion.Header>

            {/* Accordion body */}
          <Accordion.Body>
            <div data-accordion-element-content class='content'>
              <div class='p'>
                {/* Custom FileUpload component */}
                <FileUpload category={category} />
                {/* Custom ListFiles component */}
                <ListFiles category={category} />
              </div>
            </div>
          </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

// Export the AccordionData component for use in other parts of the application
export default AccordionData;
