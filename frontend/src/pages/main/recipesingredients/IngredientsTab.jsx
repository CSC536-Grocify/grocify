import React, { useState, useEffect } from 'react';
import './IngredientsTab.scss';
import { useLocation } from "react-router-dom";
import { useDeleteIngredientMutation, useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import { useCreateIngredientMutation, useUpdateIngredientMutation } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import IngredientsDropDown from './IngredientsDropDown';


function IngredientsTab() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [createIngredient, { isCreateLoading }] = useCreateIngredientMutation();
    const [updateIngredient, { isUpdateLoading }] = useUpdateIngredientMutation();
    const [deleteIngredientAPI, { isDeleteIngredientLoading }] = useDeleteIngredientMutation();
    const {
        data: ingredientsFromAPI, // rename data to ingredients
        isLoading,
        refetch
    } = useGetIngredientsQuery();
    const location = useLocation();

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleSaveIngredient = async (newIngredientInfo) => {
        try {
            if (newIngredientInfo.id === null) {
                await createIngredient({ name: newIngredientInfo.name }).unwrap();
            } else {
                await updateIngredient({ id: newIngredientInfo.id, name: newIngredientInfo.name }).unwrap();
            }
            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditButton = (event, ingredient) => {
        event.preventDefault();

        setSelectedIngredient(ingredient);
        setModalOpen(true);
    }

    const handleRemoveButton = async (event, id) => {
        event.preventDefault();
        try {
            await deleteIngredientAPI({ id: id }).unwrap();
            refetch();
        } catch (error) {
            console.error(error);
        }
    };

    return (isLoading || isDeleteIngredientLoading || isCreateLoading || isUpdateLoading ? <div>Loading...</div> : (
        <div>
            <button id="button" className="add-btn" onClick={() => handleModalOpen()}>
                <span>+</span>
            </button>
            <IngredientsDropDown
                open={modalOpen}
                handleClose={handleModalClose}
                handleSave={handleSaveIngredient}
                currentIngredientInfo={selectedIngredient}
            />
            <div className="ingredients-container">
                {ingredientsFromAPI.data.map((ingredient) => (
                    <div className="ingredient-card" key={ingredient.id}>
                        <span className="ingredient-title">{ingredient.name}</span>
                        <button className="edit-button" onClick={(event) => handleEditButton(event, ingredient)}>
                            Edit
                        </button>
                        <button className="remove-button" onClick={(event) => handleRemoveButton(event, ingredient.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    ));
}

export default IngredientsTab;