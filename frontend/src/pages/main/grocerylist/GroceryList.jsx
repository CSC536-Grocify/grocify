import React, { useState } from "react";
import './GroceryList.scss';
import { useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';


function GroceryList() {
  const [fetchIngredients, setFetchIngredients] = useState(false);

  const {
    data: ingredientsFromAPI, // rename data to ingredients
    isLoading,
    refetch
  } = useGetIngredientsQuery({ skip: !fetchIngredients });

  const handleMakeGroceryListButton = async (event) => {
    event.preventDefault();

    if (fetchIngredients) {
      refetch(); // Re-fetch the data when the button is clicked again
    } else {
      setFetchIngredients(true);
    }
  };

  function handleRemoveButton(event, id) {
    event.preventDefault();
    console.log(id);
  }

  return (isLoading ? <div>Loading...</div> : (
    <div>
      <div className="grocerylist-tab">GROCERY LIST</div>
      <button id="button" className="Grocbutton" onClick={handleMakeGroceryListButton}>
        <span>Make grocery list</span>
      </button>
      {fetchIngredients && ingredientsFromAPI && ingredientsFromAPI.data &&
        <div className="ingredients-container">
          {ingredientsFromAPI.data.map((ingredient) => (
            <div className="ingredient-card" key={ingredient.id}>
              <span className="ingredient-title">{ingredient.name}</span>
              <button className="remove-button" onClick={(event) => handleRemoveButton(event, ingredient.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      }
    </div>
  ));
}

export default GroceryList;
