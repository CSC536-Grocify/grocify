import React, { useState, useEffect } from "react";
import './RecipesDropDown.scss';
import { useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import { useCreateIngredientMutation, useUpdateIngredientMutation } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import IngredientsDropDown from './IngredientsDropDown';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Autocomplete,
} from "@mui/material";


function RecipesDropDown({ open, handleClose, handleSave, currentRecipeInfo = null }) {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [ingredientSearchValue, setIngredientSearchValue] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientModalOpen, setIngredientModalOpen] = useState(false);
    const [ingredientModelOpenArgument, setIngredientModalOpenArgument] = useState(null);
    const [createIngredient, { isCreateLoading }] = useCreateIngredientMutation();
    const [updateIngredient, { isUpdateLoading }] = useUpdateIngredientMutation();
    const {
        data: ingredientsFromAPI, // rename data to ingredients
        isIngredientsLoading,
        refetch
    } = useGetIngredientsQuery();

    useEffect(() => {
        if (currentRecipeInfo) {
            setRecipeTitle(currentRecipeInfo.title);
            setSelectedIngredients(currentRecipeInfo.ingredients);
        }
    }, [currentRecipeInfo]);

    const handleIngredientModalClose = () => {
        setIngredientModalOpenArgument(null);
        setIngredientModalOpen(false);
    };

    const handleSaveIngredient = async (newIngredientInfo) => {
        try {
            let newIngredientFromAPI = null;
            if (newIngredientInfo.id === null) {
                newIngredientFromAPI = await createIngredient({ name: newIngredientInfo.name }).unwrap();
            } else {
                newIngredientFromAPI = await updateIngredient({ id: newIngredientInfo.id, name: newIngredientInfo.name }).unwrap();
            }
            await refetch();
            setIngredientModalOpenArgument(null);
            addIngredientToSelectedIngredients(newIngredientFromAPI.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTitleChange = (event) => {
        setRecipeTitle(event.target.value);
    };

    const resetData = () => {
        setRecipeTitle("");
        setSelectedIngredients([]);
    };

    const handleSaveClick = async () => {
        const newRecipeInfo = {
            title: recipeTitle,
            id: null,
            ingredient_ids: selectedIngredients.map((ingredient) => ingredient.id)
        };

        if (currentRecipeInfo) {
            newRecipeInfo.id = currentRecipeInfo.id;
        }

        await handleSave(newRecipeInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    }

    const addIngredientToSelectedIngredients = (newIngredient) => {
        const ingredientExists = selectedIngredients.some((ingredient) => ingredient.id === newIngredient.id);

        if (!ingredientExists) {
            setSelectedIngredients([...selectedIngredients, newIngredient]);
        }
    };

    const handleSelectionChange = (event, newIngredient) => {
        const ingredientExistsInAPI = ingredientsFromAPI?.data.some((ingredient) => ingredient.id === newIngredient.id);

        if (ingredientExistsInAPI) {
            addIngredientToSelectedIngredients(newIngredient);
        }
    };

    const removeIngredient = (id) => {
        const updatedSelectedIngredients = selectedIngredients.filter((ingredient) => ingredient.id !== id);
        setSelectedIngredients(updatedSelectedIngredients);
    };

    const handleInputChange = (event, value, reason) => {
        setIngredientSearchValue(value)
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            const ingredientExists = ingredientsFromAPI?.data.some(
                (ingredient) => ingredient.name === ingredientSearchValue
            );

            if (!ingredientExists) {
                createNewIngredient();
            }
        }
    };

    const createNewIngredient = () => {
        const modalInformation = {
            ingredient_info: {
                name: ingredientSearchValue
            }
        };
        setIngredientModalOpenArgument(modalInformation);
    };

    // Opening modal when modal argument is set
    useEffect(() => {
        if (ingredientModelOpenArgument) {
            setIngredientModalOpen(true);
        }
    }, [ingredientModelOpenArgument]);

    return (isIngredientsLoading || isCreateLoading || isUpdateLoading ? <div>Loading...</div> : (
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogContent className="popUpStyle">
                <DialogTitle>{currentRecipeInfo ? "Edit Recipe" : "Add New Recipe"}</DialogTitle>
                <IngredientsDropDown 
                    open={ingredientModalOpen}
                    handleClose={handleIngredientModalClose}
                    handleSave={handleSaveIngredient}
                    currentIngredientInfo={ingredientModelOpenArgument? ingredientModelOpenArgument.ingredient_info : null}
                />
                <DialogContent className="popUpStyle">
                    <TextField 
                        autoFocus
                        margin="dense"
                        label="Recipe Name"
                        fullWidth
                        value={recipeTitle}
                        onChange={handleTitleChange}
                    />
                    <Autocomplete
                        freeSolo
                        // when the component is initially rendered, the data from the API might not be available yet
                        options={ingredientsFromAPI?.data || []}
                        getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                        onChange={handleSelectionChange}
                        onInputChange={handleInputChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Ingredient Search"
                                variant="outlined"
                                onKeyDown={handleKeyDown} />
                        )}
                    />
                    <div className="selected-ingredients-container">
                        {selectedIngredients.map((ingredient) => (
                            <div className="selected-ingredients" key={ingredient.id} >
                                <span className="selected_remove_item">{ingredient.name}</span>
                                <button className="selected_remove" onClick={() => removeIngredient(ingredient.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveClick} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    ));
}

export default RecipesDropDown;