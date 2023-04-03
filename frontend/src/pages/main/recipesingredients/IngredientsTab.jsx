import React, { useEffect } from 'react';
import './IngredientsTab.scss';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import { upsertIngredients, selectAllIngredients } from '../../../features/recipes_ingredients/ingredientsSlice';

function IngredientsTab() {
  const { 
    data: ingredientsFromAPI, // rename data to ingredients
    isLoading, 
    isSuccess, 
    isError, 
    error 
  } = useGetIngredientsQuery();
  const dispatch = useDispatch();

  // Ensure that the upsertIngredients action is dispatched only
  // when the ingredientsFromAPI value changes, and not during the
  // component's render
  useEffect(() => {
    if (ingredientsFromAPI) {
      dispatch(upsertIngredients(ingredientsFromAPI.data));
    }
  }, [ingredientsFromAPI, dispatch]);

  const ingredients = useSelector(selectAllIngredients);

  let navigate = useNavigate();
  return ( isLoading ? <div>Loading...</div> : (
    <div>
      <button id="button" className="add-btn" onClick={() => {
        navigate("/IngredientsDropdown");
      }}>
      <span>+</span>
      </button>
      <div className="ingredients-container">
        {ingredients.map((ingredient) => (
          <div className="ingredient-card" key={ingredient.id}>
            <div>{ingredient.name}</div>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default IngredientsTab;
