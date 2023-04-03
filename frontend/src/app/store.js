import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import recipesReducer from '../features/recipes_ingredients/recipesSlice';
import ingredientsReducer from '../features/recipes_ingredients/ingredientsSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
