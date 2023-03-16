import React, { useState } from "react";
import IngredientsTab from "./IngredientsTab";
import RecipesTab from "./RecipesTab";
import { TabContext, TabPanel } from "@mui/lab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function RecipesIngredients() {
  const [tabValue, setTabValue] = useState("recipes");

  function handleTabChange (event, newValue) {
    setTabValue(newValue);
  }

  return (
    <TabContext value={tabValue}>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Recipes Ingredients tabs">
        <Tab label="Recipes" value="recipes" />
        <Tab label="Ingredients" value="ingredients" />
      </Tabs>
      <TabPanel value="recipes">
        <RecipesTab />
      </TabPanel>
      <TabPanel value="ingredients">
        <IngredientsTab />
      </TabPanel>
    </TabContext>
  )
}

export default RecipesIngredients;
