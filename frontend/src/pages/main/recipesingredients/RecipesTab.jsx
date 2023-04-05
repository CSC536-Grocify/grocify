import React, { useEffect } from 'react';
import './RecipesTab.scss';
import { useNavigate, useLocation } from "react-router-dom";
import { useDeleteRecipeMutation, useGetRecipesQuery } from '../../../features/recipes_ingredients/recipesApiSlice';

function RecipesTab() {
  let navigate = useNavigate();
  const location = useLocation();
  const [deleteRecipeAPI, { isDeleteRecipeLoading }] = useDeleteRecipeMutation();
  const { 
    data: recipesFromAPI, // rename data to recipes
    isLoading, 
    isSuccess, 
    isError, 
    error,
    refetch
  } = useGetRecipesQuery();

  useEffect(() => {
    refetch();
  }, [location, refetch]);


  const handleEditButton = async (event) => {
    event.preventDefault();

    try {
      navigate('/RecipesDropdown');
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemoveButton = async (event, id) => {
    event.preventDefault();
    try{
      await deleteRecipeAPI({ id: id }).unwrap();
      refetch();
    }catch (error) {
      console.error(error);
    }
  };

  return ( isLoading ? <div>Loading...</div> : (
    <div>
      <button id="button" className="add-btn" onClick={() => {
        navigate("/RecipesDropdown");
      }}>
      <span>+</span>
      </button>
      <div className="recipes-container">
        {recipesFromAPI.data.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <span className="food-title">{recipe.title}</span>
            <button className="edit-button" onClick= { handleEditButton } >Edit</button>
            <button className="Remove-button" onClick= {(event) => handleRemoveButton(event, recipe.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default RecipesTab;