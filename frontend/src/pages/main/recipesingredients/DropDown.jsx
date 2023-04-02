import React, { useState } from 'react';

const DropdownMenu = ({ recipes }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const handleRecipeSelect = (event) => {
    const recipeName = event.target.value;
    setSelectedRecipes([...selectedRecipes, recipeName]);
  };

  return (
    <div>
      <label htmlFor="recipes-dropdown">Select a recipe:</label>
      <select id="recipes-dropdown" onChange={handleRecipeSelect}>
        <option value="">--Please choose a recipe--</option>
        {recipes.map((recipe) => (
          <option key={recipe.id} value={recipe.name}>
            {recipe.name}
          </option>
        ))}
      </select>
      <div>
        <h2>Selected Recipes:</h2>
        <ul>
          {selectedRecipes.map((recipeName, index) => (
            <li key={index}>{recipeName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownMenu;