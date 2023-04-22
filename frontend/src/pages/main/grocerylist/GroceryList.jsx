import React, { useState, useEffect } from "react";
import './GroceryList.scss';
import TagsSelection from './TagsSelection';
import AddItemPopup from "./AddItemPopup";


function GroceryList() {
  const [tagSelectModalOpen, setTagSelectModalOpen] = useState(false);
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [addItemModalOpenArgument, setAddItemModalOpenArgument] = useState(null);

  const handleTagSelectionModalClose = () => {
    setTagSelectModalOpen(false);
  };

  const handleTagSelectionConfirmSelection = (selectedTags) => {
    console.log(selectedTags.tag_ids.join(','));
  };

  const handleAddItemModalClose = () => {
    setAddItemModalOpen(false);
  };

  const handleAddItemConfirm = (newItem) => {
    console.log(newItem);
  };

  const handleMakeGroceryListButton = async (event) => {
    event.preventDefault();

    setTagSelectModalOpen(true);
  };

  const handleCreateNew = () => {
    const modalInformation = {
      item_info: null
    };
    setAddItemModalOpenArgument(modalInformation);
  };

  // Opening modal when modal argument is set
  useEffect(() => {
    if (addItemModalOpenArgument) {
      setAddItemModalOpen(true);
    }
  }, [addItemModalOpenArgument]);

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
      <button id="button" className="add-btn" onClick={() => handleCreateNew()}>
        <span>+</span>
      </button>
      <TagsSelection
        open={tagSelectModalOpen}
        handleClose={handleTagSelectionModalClose}
        handleConfirm={handleTagSelectionConfirmSelection}
      />
      <AddItemPopup
        open={addItemModalOpen}
        handleClose={handleAddItemModalClose}
        handleConfirm={handleAddItemConfirm}
        currentItemInfo={addItemModalOpenArgument? addItemModalOpenArgument.item_info : null}
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
