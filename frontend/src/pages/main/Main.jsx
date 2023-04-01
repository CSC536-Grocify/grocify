import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import './main.scss';
import TagsPannel from "./tagspannel/TagsPannel";
import RecipesIngredients from "./recipesingredients/RecipesIngredients";
import GroceryList from "./grocerylist/GroceryList";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import KitchenIcon from '@mui/icons-material/Kitchen';
import EggIcon from '@mui/icons-material/Egg';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import VerticalNav from "./verticalnav/VerticalNav";
import ListIcon from '@mui/icons-material/List';

function Main() {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  // Set matches to true if device is PC, else false (i.e., device is mobile)
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(min-width: 768px)');
    const listener = (e) => setMatches(e.matches);

    // Attach the listener to the MediaQueryList
    mediaQueryList.addEventListener('change', listener);

    // Clean up the listener when the component is unmounted
    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, []);

  const [bottomNavigationValue, setBottomNavigationValue] = useState(2);

  const renderColumn = () => {
    switch (bottomNavigationValue) {
      case 0:
        return (
          <div className="mobile-column">
            <TagsPannel />
          </div>
        );
      case 1:
        return (
          <div className="mobile-column">
            <RecipesIngredients />
          </div>
        );
      case 2:
        return (
          <div className="mobile-column">
            <GroceryList />
          </div>
        );
      case 3:
        return (
          <div className="mobile-vertical-navigation">
            <VerticalNav />
          </div>
        );
      default:
        return (
          <div className="mobile-column">
            <GroceryList />
          </div>
        );
    }
  };

  return (
    <div id="root">
      {matches ? (
        <div className="pc-container">
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
          <VerticalNav />
        </div>
      ) : (
        <div className="mobile-container">
          <div className="container">
            {renderColumn()}
          </div>
          <div className="bottom-navigation">
            <BottomNavigation
              showLabels
              value={bottomNavigationValue}
              onChange={(event, newValue) => {
                setBottomNavigationValue(newValue);
              }}
            >
              <BottomNavigationAction label="Tags" icon={<RestaurantIcon />} />
              <BottomNavigationAction label="Food" icon={<KitchenIcon />} />
              <BottomNavigationAction label="Grocery" icon={<EggIcon />} />
              <BottomNavigationAction label="Options" icon={<ListIcon />} />
            </BottomNavigation>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;