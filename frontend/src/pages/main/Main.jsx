import React from "react";
import './main.scss';
import TagsPannel from "./tagspannel/TagsPannel";
import RecipesIngredients from "./recipesingredients/RecipesIngredients";
import GroceryList from "./grocerylist/GroceryList";

function Main() {
  return (
    <div class="container">
      <div class="tag-pannel">
        <TagsPannel />
      </div>
      <div class="recipes-ingredients">
        <RecipesIngredients />
      </div>
      <div class="grocery-list">
        <GroceryList />
      </div>
    </div>
  )
}

export default Main;
