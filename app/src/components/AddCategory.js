// Import necessary React components and hooks
import React, { useState } from 'react';

// Functional component for adding a new category
function AddCategory({ addNewCategory }) {
  // State for managing the input value
  const [input, setInput] = useState('');

  // Function to update the input state as the user types
  const newCategory = (e) => {
    setInput(e.target.value);
  };

  // Function to add a new category when the "Add Category" button is clicked
  const addCategory = () => {
    // Check if the input is not empty or only contains whitespace
    if (input.trim() !== '') {
      // Call the addNewCategory function with the input value
      addNewCategory(input);

      // Clear the input after adding the category
      setInput('');
    }
  };

  // Render the component with an input field and a button for adding categories
  return (
    <div>
      {/* Input field for entering a new category */}
      <input type="text" placeholder='Category' value={input} onChange={newCategory} />

      {/* Button to trigger the addition of a new category */}
      <input type="button" value='Add Category' onClick={addCategory} />
    </div>
  );
}

// Export the AddCategory component for use in other parts of the application
export default AddCategory;
