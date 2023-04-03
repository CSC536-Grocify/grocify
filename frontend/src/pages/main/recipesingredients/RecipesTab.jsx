import React, { useEffect } from 'react';
import './RecipesTab.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useGetRecipesQuery } from '../../../features/recipes_ingredients/recipesApiSlice';
import { upsertRecipes, selectAllRecipes } from '../../../features/recipes_ingredients/recipesSlice';


function RecipesTab() {
  const { 
    data: recipesFromAPI, // rename data to recipes
    isLoading, 
    isSuccess, 
    isError, 
    error 
  } = useGetRecipesQuery();
  const dispatch = useDispatch();

  // Ensure that the upsertRecipes action is dispatched only
  // when the recipesFromAPI value changes, and not during the
  // component's render
  useEffect(() => {
    if (recipesFromAPI) {
      dispatch(upsertRecipes(recipesFromAPI.data));
    }
  }, [recipesFromAPI, dispatch]);

  const recipes = useSelector(selectAllRecipes);

  let navigate = useNavigate();
  return ( isLoading ? <div>Loading...</div> : (
    <div>
      <button id="button" className="add-btn" onClick={() => {
        navigate("/RecipesDropdown");
      }}>
      <span>+</span>
      </button>
      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <div>{recipe.title}</div>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default RecipesTab;
