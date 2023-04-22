import React, { useState } from "react";
import './GroceryList.scss';
import TagsSelection from './TagsSelection';


function GroceryList() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleConfirmSelection = (selectedTags) => {
    console.log(selectedTags.tag_ids.join(','));
  };

  const handleMakeGroceryListButton = async (event) => {
    event.preventDefault();

    setModalOpen(true);
  };

  // function handleRemoveButton(event, id) {
  //   event.preventDefault();
  //   console.log(id);
  // }

  return (
    <div>
      <div>Grocery List</div>
      <button id="button" className="Grocbutton" onClick={handleMakeGroceryListButton}>
        <span>Make grocery list</span>
      </button>
      <TagsSelection
        open={modalOpen}
        handleClose={handleModalClose}
        handleConfirm={handleConfirmSelection}
      />
      {/* {fetchIngredients && ingredientsFromAPI && ingredientsFromAPI.data &&
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
      } */}
    </div>
  );
}

export default GroceryList;
