import React, { useEffect } from 'react';
import './IngredientsTab.scss';
import { useNavigate, useLocation } from "react-router-dom";
import { useDeleteIngredientMutation, useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';

function IngredientsTab() {
  let navigate = useNavigate();
  const location = useLocation();
  const [deleteIngredientAPI, { isDeleteIngredientLoading }] = useDeleteIngredientMutation();
  const { 
    data: ingredientsFromAPI, // rename data to ingredients
    isLoading, 
    isSuccess, 
    isError, 
    error,
    refetch
  } = useGetIngredientsQuery();
  
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const handleEditButton = (event) => {
    event.preventDefault();
    try {
      navigate('/ingredient_edit');
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemoveButton = async (event, id) => {
    event.preventDefault();
    try{
      await deleteIngredientAPI({ id: id }).unwrap();
      refetch();
    }catch (error) {
      console.error(error);
    }
  };

  return ( isLoading || isDeleteIngredientLoading ? <div>Loading...</div> : (
    <div>
      <button id="button" className="add-btn" onClick={() => {
        navigate("/ingredient_edit");
      }}>
      <span>+</span>
      </button>
      <div className="ingredients-container">
        {ingredientsFromAPI.data.map((ingredient) => (
          <div className="ingredient-card" key={ingredient.id}>
            <span className="ingredient-title">{ingredient.name}</span>
            <button className="edit-button" onClick= { handleEditButton } >Edit</button>
            <button className="Remove-button" onClick= {(event) => handleRemoveButton(event, ingredient.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default IngredientsTab;