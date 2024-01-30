// Import necessary React components and hooks
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to manage category-related state and actions
const CategoryContext = createContext();

// Custom hook to access the CategoryContext
export const useCategoryContext = () => useContext(CategoryContext);

// Provider component for managing category-related state
export const CategoryProvider = ({ children }) => {
  // Retrieve initial categories from localStorage or use an empty array
  const initialCategories = JSON.parse(localStorage.getItem('categories')) || [];

  // State to manage the list of categories
  const [categories, setCategories] = useState(initialCategories);

  // Update localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  // Function to add a new category
  const addNewCategory = (newCategory) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: newCategory, key: newCategory.toLowerCase() },
    ]);
  };

  // Function to remove a category
  const removeCategory = (categoryName) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.name !== categoryName)
    );
  };

  // Provide the category-related state and actions to the components within the context
  return (
    <CategoryContext.Provider value={{ removeCategory, categories, setCategories, addNewCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};


    