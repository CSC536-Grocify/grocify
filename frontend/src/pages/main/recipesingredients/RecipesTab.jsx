import React, { useState, useEffect } from 'react';
import './RecipesTab.scss';
import { useLocation } from "react-router-dom";
import { useDeleteRecipeMutation, useGetRecipesQuery } from '../../../features/recipes_ingredients/recipesApiSlice';
import { useCreateRecipeMutation, useUpdateRecipeMutation } from '../../../features/recipes_ingredients/recipesApiSlice';
import RecipesDropDown from './RecipesDropDown';


function RecipesTab() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modelOpenArgument, setModalOpenArgument] = useState(null);
    const [createRecipe, { isCreateLoading }] = useCreateRecipeMutation();
    const [updateRecipe, { isUpdateLoading }] = useUpdateRecipeMutation();
    const [deleteRecipeAPI, { isDeleteRecipeLoading }] = useDeleteRecipeMutation();
    const {
        data: recipesFromAPI, // rename data to recipes
        isLoading,
        refetch
    } = useGetRecipesQuery();
    const location = useLocation();

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    const handleCreateNew = () => {
        const modalInformation = {
            recipe_info: null
        };
        setModalOpenArgument(modalInformation);
    };

    const handleEditButton = (event, recipe) => {
        event.preventDefault();

        const modalInformation = {
            recipe_info: recipe
        };
        setModalOpenArgument(modalInformation);
    }

    // Opening modal when modal argument is set
    useEffect(() => {
        if (modelOpenArgument) {
            setModalOpen(true);
        }
    }, [modelOpenArgument]);

    const handleModalClose = () => {
        setModalOpenArgument(null);
        setModalOpen(false);
    };

    const handleSaveRecipe = async (newRecipeInfo) => {
        try {
            if (newRecipeInfo.id === null) {
                await createRecipe({ title: newRecipeInfo.title }).unwrap();
            } else {
                await updateRecipe({ id: newRecipeInfo.id, title: newRecipeInfo.title }).unwrap();
            }
            await refetch();
            setModalOpenArgument(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveButton = async (event, id) => {
        event.preventDefault();
        try {
            await deleteRecipeAPI({ id: id }).unwrap();
            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    return (isLoading || isDeleteRecipeLoading || isCreateLoading || isUpdateLoading ? <div>Loading...</div> : (
        <div>
            <button id="button" className="add-btn" onClick={() => handleCreateNew()}>
                <span>+</span>
            </button>
            <RecipesDropDown
                open={modalOpen}
                handleClose={handleModalClose}
                handleSave={handleSaveRecipe}
                currentRecipeInfo={modelOpenArgument? modelOpenArgument.recipe_info : null}
            />
            <div className="recipes-container">
                {recipesFromAPI.data.map((recipe) => (
                    <div className="recipe-card" key={recipe.id}>
                        <span className="food-title">{recipe.title}</span>
                        <button className="edit-button" onClick={(event) => handleEditButton(event, recipe)}>
                            Edit
                        </button>
                        <button className="remove-button" onClick={(event) => handleRemoveButton(event, recipe.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    ));
}

export default RecipesTab;