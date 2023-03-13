import React, {useState, useEffect} from "react";
import './main.scss';
import TagsPannel from "./tagspannel/TagsPannel";
import RecipesIngredients from "./recipesingredients/RecipesIngredients";
import GroceryList from "./grocerylist/GroceryList";

function Main() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )

  useEffect(() => {
    window
    .matchMedia("(min_width: 768px)")
    .addEventListener('change', e => setMatches(e.matches));
  }, []);

  return (
    <div id="root">
      {matches && (
        <div className="container">
          <div className="tag-pannel">
            <TagsPannel />
          </div>
          <div className="recipes-ingredients">
            <RecipesIngredients />
          </div>
          <div className="grocery-list">
            <GroceryList />
          </div>
        </div>
      )}
      {!matches && (
        <div className="grocery-list">
          <GroceryList />
        </div>
      )}
    </div>
  );
}

export default Main;
