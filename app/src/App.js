import React from 'react';
import AddCategory from './components/AddCategory';
import AccordionData from './components/AccordionData';
import {useCategoryContext} from './components/CategoryContext';

function App({category}) {
  const {categories, addNewCategory } = useCategoryContext();
  /** 
  const clearCategories = (deleteCategoryName) => {
    setCategories(categories.filter((cat) => cat.name !== deleteCategoryName));
  }
  /***/  
  return (
        
    <div className='app'>
      <div style={{ margin:'15px'}}>
        <AddCategory addNewCategory={addNewCategory} />
      </div>
      {/*
      <button onClick={clearCategories}>Clear Categories</button> 
    */}
      {categories.map((category, index) => (
        <AccordionData key={category.key} category={category.key} />
      ))}
      
      </div>
      
  );
}   
 export default App;