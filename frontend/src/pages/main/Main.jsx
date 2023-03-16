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
          <div className="column">
            <TagsPannel />
          </div>
          <div className="column">
            <RecipesIngredients />
          </div>
          <div className="column">
            <GroceryList />
          </div>
        </div>
      )}
      {!matches && (
        <div className="container">
          <div className="column">
            <GroceryList />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
