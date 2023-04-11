import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './RecipesDropDown.scss';
import { useCreateRecipeMutation, useUpdateRecipeMutation } from '../../../features/recipes_ingredients/recipesApiSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';


function RecipesDropDown() {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeId, setRecipeId] = useState('');
    const [ingredientSearchValue, setIngredientSearchValue] = useState('');
    const [createRecipe, { isLoading }] = useCreateRecipeMutation();
    const [updateRecipe, { isUpdateLoading }] = useUpdateRecipeMutation();
    let navigate = useNavigate();
    const location = useLocation();
    const recipeInfo = location.state?.data;
    const {
        data: ingredientsFromAPI, // rename data to ingredients
        isIngredientsLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetIngredientsQuery();

    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const handleSelectionChange = (event, newIngredient) => {
        // Check if ingredient with same ID already exists
        const ingredientExists = selectedIngredients.some((ingredient) => ingredient.id === newIngredient.id);

        if (!ingredientExists) {
            setSelectedIngredients([...selectedIngredients, newIngredient]);
        }
    };

    const removeIngredient = (id) => {
        const updatedSelectedIngredients = selectedIngredients.filter((ingredient) => ingredient.id !== id);
        setSelectedIngredients(updatedSelectedIngredients);
    };

    // Only load the recipe info after component is mounted
    useEffect(() => {
        refetch();

        if (loadRecipeInfoFromLocalStorage()) {
            return;
        } else if (recipeInfo) {
            setRecipeTitle(recipeInfo.title);
            setRecipeId(recipeInfo.id);
        }
    }, [location, refetch, recipeInfo]);

    const handleTitleChange = (event) => {
        setRecipeTitle(event.target.value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            await createRecipe({ title: recipeTitle, description: 'NA' }).unwrap();
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateRecipe({ title: recipeTitle, id: recipeId }).unwrap();
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    const saveRecipeInfoToLocalStorage = () => {
        const savingRecipeInfo = {
            id: recipeId,
            title: recipeTitle,
            selectedIngredients: selectedIngredients,
        };

        localStorage.setItem('recipeInfo', JSON.stringify(savingRecipeInfo));
    };

    function loadRecipeInfoFromLocalStorage() {
        const savedRecipeInfoJSON = localStorage.getItem('recipeInfo');

        if (savedRecipeInfoJSON) {
            const savedRecipeInfo = JSON.parse(savedRecipeInfoJSON);

            // Restore the recipe information from the local storage
            setRecipeTitle(savedRecipeInfo.title);
            setRecipeId(savedRecipeInfo.id);
            setSelectedIngredients(savedRecipeInfo.selectedIngredients);

            // Remove the recipe information from localStorage
            localStorage.removeItem("recipeInfo");

            return true
        }

        return false
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
                createNewIngredient(ingredientSearchValue);
            }
        }
    };

    const createNewIngredient = async (name) => {
        // Save the recipe information in the local storage
        saveRecipeInfoToLocalStorage();

        // Navigate to the create ingredient page with the name of the ingredient
        // and the current page as the backToAddr
        navigate('/ingredient_edit', {
            state: {
                data: {
                    ingredient_name: name,
                    back_to_addr: location.pathname
                }
            }
        });
    };

    return (isLoading || isUpdateLoading || isIngredientsLoading ? <div>Loading...</div> : (
        <div className="bg-popContainer">
            <div className="pop-box">
                <div
                    id="close"
                    className="closer"
                    onClick={() => {
                        navigate("/main");
                    }}
                >
                    +
                </div>
                <div>
                    <label>
                        <input className="fieldStylehead"
                            placeholder="Title"
                            type="text"
                            value={recipeTitle}
                            onChange={handleTitleChange}
                        />
                    </label>
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
                </div>
                {!recipeId ? (
                    <button className="button" onClick={handleCreateSubmit}>
                        Create
                    </button>
                ) : (
                    <button className="button" onClick={handleSaveSubmit}>
                        Save
                    </button>
                )}
            </div>
        </div>
    ));
}

export default RecipesDropDown;
