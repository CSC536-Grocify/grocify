import React, { useState } from "react";
import IngredientsTab from "./IngredientsTab";
import RecipesTab from "./RecipesTab";
import { TabContext, TabPanel } from "@mui/lab";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";


const styles = {
    tab: {
      fontWeight: 'bold',
      color: 'black',
      fontFamily: 'Arial, Helvetica, sans-serif',
      fontWeight: 'bold',  
      fontSize: 'large',
    //   marginLeft: '20px',
    //   marginTop:'20px'
    },
  };

function RecipesIngredients() {
    const [tabValue, setTabValue] = useState("recipes");

    function handleTabChange(event, newValue) {
        setTabValue(newValue);
    }

    return (
        <TabContext value={tabValue}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Recipes Ingredients tabs" className="custom-tab" style={styles.tab}>
                <Tab label="Recipes" value="recipes" className="custom-tab" style={styles.tab}/>
                <Tab label="Ingredients" value="ingredients" className="custom-tab" style={styles.tab}/>
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
