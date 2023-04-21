import React, { useState, useEffect } from "react";
import { useGetRecipesQuery } from '../../../features/recipes_ingredients/recipesApiSlice';
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
        const recipeExistsInAPI = recipesFromAPI?.data.some((recipe) => recipe.id === newRecipe.id);

        if (recipeExistsInAPI) {
            addRecipeToSelectedRecipes(newRecipe);
        }
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
