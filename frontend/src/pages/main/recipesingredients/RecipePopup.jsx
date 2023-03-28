// import React, { useState } from 'react';

// function RecipePopup() {
//   return (
//     <form>
//       <label htmlFor="recipe-name">Recipe Name:</label>
//       <input type="text" id="recipe-name" name="recipe-name" />
//       <br />
//       <label htmlFor="recipe-description">Recipe Description:</label>
//       <textarea id="recipe-description" name="recipe-description"></textarea>
//       <br />
//       <label htmlFor="recipe-ingredients">Recipe Ingredients:</label>
//       <textarea id="recipe-ingredients" name="recipe-ingredients"></textarea>
//       <br />
//       <label htmlFor="recipe-instructions">Recipe Instructions:</label>
//       <textarea id="recipe-instructions" name="recipe-instructions"></textarea>
//       <br />
//       <button type="submit">Submit Recipe</button>
//     </form>
//   );
// }

// export default RecipePopup;


import React from 'react';

function RecipePopup() {
  const [recipeName, setRecipeName] = React.useState('');
  const [ingredients, setIngredients] = React.useState('');
  const [instructions, setInstructions] = React.useState('');

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleInstructionsChange = (event) => {
    setInstructions(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit the new recipe to the server
  };

  return (
    <div>
      <h1>New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Recipe Name:
          <input type="text" value={recipeName} onChange={handleRecipeNameChange} />
        </label>
        <label>
          Ingredients:
          <textarea value={ingredients} onChange={handleIngredientsChange} />
        </label>
        <label>
          Instructions:
          <textarea value={instructions} onChange={handleInstructionsChange} />
        </label>
        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
}

export default RecipePopup;