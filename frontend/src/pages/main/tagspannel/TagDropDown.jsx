import React, { useState, useEffect } from "react";
import { useGetRecipesQuery } from '../../../features/recipes_ingredients/recipesApiSlice';
import './TagDropDown.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Autocomplete,
} from "@mui/material";


function TagDropDown({ open, handleClose, handleSave, handleDelete, currentTagInfo = null }) {
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [name, setName] = useState('');
    const {
        data: recipesFromAPI,
        isRecipesLoading
    } = useGetRecipesQuery();

    useEffect(() => {
        if (currentTagInfo) {
            setName(currentTagInfo.name);
            setSelectedRecipes(currentTagInfo.recipes);
        }
    }, [currentTagInfo]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    function resetData() {
        setName("");
    }

    const handleSaveClick = async () => {
        const newTagInfo = {
            name: name,
            id: null,
            recipe_ids: selectedRecipes.map((recipe) => recipe.id)
        };

        if (currentTagInfo && currentTagInfo.hasOwnProperty('id')) {
            newTagInfo.id = currentTagInfo.id;
        }

        await handleSave(newTagInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    };

    const handleDeleteClick = async () => {
        await handleDelete(currentTagInfo.id);
        resetData();
        handleClose();
    };

    const addRecipeToSelectedRecipes = (newRecipe) => {
        const recipeExists = selectedRecipes.some((recipe) => recipe.id === newRecipe.id);

        if (!recipeExists) {
            setSelectedRecipes([...selectedRecipes, newRecipe]);
        }
    };

    const handleSelectionChange = (event, newRecipe) => {
        if (!newRecipe) {
            return;
        }

        const recipeExistsInAPI = recipesFromAPI?.data.some((recipe) => recipe.id === newRecipe.id);

        if (recipeExistsInAPI) {
            addRecipeToSelectedRecipes(newRecipe);
        }
    };

    const removeRecipe = (id) => {
        const updatedSelectedRecipes = selectedRecipes.filter((recipe) => recipe.id !== id);
        setSelectedRecipes(updatedSelectedRecipes);
    };

    return (isRecipesLoading ? <div>Loading...</div> :
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>{currentTagInfo ? "Edit Tag" : "Add New Tag"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tag Name"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
                <Autocomplete
                    // when the component is initially rendered, the data from the API might not be available yet
                    options={recipesFromAPI?.data || []}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.title}
                    onChange={handleSelectionChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Recipe Search"
                            variant="outlined"
                        />
                    )}
                />
                <div className="selected-recipes-container">
                    {selectedRecipes.map((recipe) => (
                        <div className="selected-recipes" key={recipe.id} >
                            <span className="selected_remove_item">{recipe.title}</span>
                            <button className="selected_remove" onClick={() => removeRecipe(recipe.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                {currentTagInfo && currentTagInfo.hasOwnProperty('id') && (
                    <Button onClick={handleDeleteClick} color="primary">
                        Delete
                    </Button>
                )}
                <Button onClick={handleCloseClick} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveClick} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default TagDropDown;
