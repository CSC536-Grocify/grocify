import React, { useState, useEffect } from 'react';
import './IngredientsTab.scss';
import { useLocation } from "react-router-dom";
import { useDeleteIngredientMutation, useGetIngredientsQuery } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import { useCreateIngredientMutation, useUpdateIngredientMutation } from '../../../features/recipes_ingredients/ingredientsApiSlice';
import IngredientsDropDown from './IngredientsDropDown';


function IngredientsTab() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modelOpenArgument, setModalOpenArgument] = useState(null);
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

    const handleCreateNew = () => {
        const modalInformation = {
            ingredient_info: null
        };
        setModalOpenArgument(modalInformation);
    };

    const handleEditButton = (event, ingredient) => {
        event.preventDefault();

        const modalInformation = {
            ingredient_info: ingredient
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

    const handleSaveIngredient = async (newIngredientInfo) => {
        try {
            if (newIngredientInfo.id === null) {
                await createIngredient({
                    name: newIngredientInfo.name,
                    category_ids: newIngredientInfo.category_ids.join(',')
                });
            } else {
                await updateIngredient({
                    id: newIngredientInfo.id,
                    name: newIngredientInfo.name,
                    category_ids: newIngredientInfo.category_ids.join(',')
                });
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
            await deleteIngredientAPI({ id: id }).unwrap();
            await refetch();
        } catch (error) {
            console.error(error);
        }
    };

    return (isLoading || isDeleteIngredientLoading || isCreateLoading || isUpdateLoading ? <div>Loading...</div> : (
        <div>
            <button id="button" className="add-btn" onClick={() => handleCreateNew()}>
                <span>+</span>
            </button>
            <IngredientsDropDown
                open={modalOpen}
                handleClose={handleModalClose}
                handleSave={handleSaveIngredient}
                currentIngredientInfo={modelOpenArgument ? modelOpenArgument.ingredient_info : null}
            />
            <div className="ingredients-container">
                {ingredientsFromAPI.data.map((ingredient) => (
                    <div className="ingredient-card" key={ingredient.id}>
                        <div className="ingredient-and-buttons">
                        <span className="ingredient-title">{ingredient.name}</span>
                        <button className="edit-button" onClick={(event) => handleEditButton(event, ingredient)}>
                            Edit
                        </button>
                        <button className="remove-button" onClick={(event) => handleRemoveButton(event, ingredient.id)}>
                            Remove
                        </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ));
}

export default IngredientsTab;