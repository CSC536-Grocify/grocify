import { createSlice } from '@reduxjs/toolkit';

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
  },
  reducers: {
    addOrUpdateIngredient: (state, action) => {
      const { id, name } = action.payload;
      const index = state.ingredients.findIndex(ingredient => ingredient.id === id);
      if (index !== -1) {
        state.ingredients[index].name = name;
      } else {
        state.ingredients.push({ id, name });
      }
    },
    deleteIngredient: (state, action) => {
      const id = action.payload;
      state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== id);
    },
    upsertIngredients: (state, action) => {
      const newIngredients = action.payload;
      if (!Array.isArray(newIngredients)) return; // handle undefined input

      newIngredients.forEach(newIngredient => {
        const { id, name } = newIngredient;
        const index = state.ingredients.findIndex(ingredient => ingredient.id === id);

        if (index !== -1) {
          state.ingredients[index] = { id, name };
        } else {
          state.ingredients.push({ id, name });
        }
      });
    },
  },
});

export const { addOrUpdateIngredient, deleteIngredient, upsertIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

export const selectAllIngredients = (state) => state.ingredients.ingredients;
export const selectIngredientById = (state, ingredientId) => state.ingredients.ingredients.find(ingredient => ingredient.id === ingredientId);
