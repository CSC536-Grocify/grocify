import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './RecipesDropDown.scss';
import { useCreateRecipeMutation, useUpdateRecipeMutation } from '../../../features/recipes_ingredients/recipesApiSlice';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';


function RecipesDropDown() {
    const [title, setTitle] = useState('');
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
        if (recipeInfo) {
            setTitle(recipeInfo.title);
        }
    }, [recipeInfo]);

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            await createRecipe({ title: title, description: 'NA' }).unwrap();
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateRecipe({ title: title, id: recipeInfo.id }).unwrap();
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

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
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </label>
                    <Autocomplete
                        // when the component is initially rendered, the data from the API might not be available yet
                        options={ingredientsFromAPI?.data || []}
                        getOptionLabel={(option) => option.name}
                        onChange={handleSelectionChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Ingredient Search" variant="outlined" />
                        )}
                    />
                    <div className="selected-ingredients-container">
                        {selectedIngredients.map((ingredient) => (
                            <div className="selected-ingredients" key={ingredient.id} >
                                <p>{ingredient.name}</p>
                                <button onClick={() => removeIngredient(ingredient.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                </div>
                {!recipeInfo ? (
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
