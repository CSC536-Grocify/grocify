import { createSlice } from '@reduxjs/toolkit';

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
  },
  reducers: {
    addOrUpdateRecipe: (state, action) => {
      const { id, title } = action.payload;
      const index = state.recipes.findIndex(recipe => recipe.id === id);
      if (index !== -1) {
        state.recipes[index].title = title;
      } else {
        state.recipes.push({ id, title });
      }
    },
    deleteRecipe: (state, action) => {
      const id = action.payload;
      state.recipes = state.recipes.filter(recipe => recipe.id !== id);
    },
    upsertRecipes: (state, action) => {
      const newRecipes = action.payload;
      if (!Array.isArray(newRecipes)) return; // handle undefined input

      newRecipes.forEach(newRecipe => {
        const { id, title } = newRecipe;
        const index = state.recipes.findIndex(recipe => recipe.id === id);

        if (index !== -1) {
          state.recipes[index] = { id, title };
        } else {
          state.recipes.push({ id, title });
        }
      });
    },    
  },
});

export const { addOrUpdateRecipe, deleteRecipe, upsertRecipes } = recipesSlice.actions;
export default recipesSlice.reducer;

export const selectAllRecipes = (state) => state.recipes.recipes;
export const selectRecipeById = (state, recipeId) => state.recipes.recipes.find(recipe => recipe.id === recipeId);
