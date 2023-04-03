import React, { useState , useEffect } from 'react';
import './RecipesTab.scss';
import { useNavigate } from "react-router-dom";

function IngredientsTab() {
  const [foods, setFoods] = useState([]);

  // This useEffect hook could be used to fetch the food data from an API or other data source
  useEffect(() => {
    // Example of setting up initial food data
    setFoods([
      { name: 'cheese' },
      { name: 'pickel' },
      { name: 'bread' },
    ]);
  }, []);

  const handleEditClick = (index) => {
    // Navigate to edit page for the food at the given index
    navigate(`/editFood/${index}`);
  };

  const handleRemoveClick = (index) => {
    // Remove the food at the given index from the foods array
    const newFoods = [...foods];
    newFoods.splice(index, 1);
    setFoods(newFoods);
  };

  let navigate = useNavigate();

    return (
      <div>
        <button id="button" className="add-btn" onClick={() => {
          navigate("/Ingredientsdropdown");
        }}>
        <span>+</span>
        </button>
        {/* <div>
          Hello world
        </div> */}
        <div className="food-list">
        {foods.map((food, index) => (
          <div key={index} className="food-item">
            <span className="food-name">{food.name}</span>
            <button className="edit-button" onClick={() => {
          navigate("/Ingredientsdropdown");
        }}>
              Edit
            </button>
            <button className="remove-button" onClick={() => handleRemoveClick(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      </div>  
    );}
export default IngredientsTab;
