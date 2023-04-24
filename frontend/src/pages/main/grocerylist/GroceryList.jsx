import React, { useState, useEffect } from "react";
import './GroceryList.scss';
import { useLocation } from "react-router-dom";
import TagsSelection from './TagsSelection';
import IngredientsDropDown from "../recipesingredients/IngredientsDropDown";
import {
    useGetGroceryListQuery,
    useMakeGroceryListMutation,
    useDeleteGroceryItemMutation,
    useAddGroceryItemMutation,
    useUpdateGroceryItemMutation,
} from '../../../features/grocery_list/groceryListApiSlice';


function GroceryList() {
    const [tagSelectModalOpen, setTagSelectModalOpen] = useState(false);
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [addItemModalOpenArgument, setAddItemModalOpenArgument] = useState(null);
    const [makeGroceryList, { isMakeGroceryListLoading }] = useMakeGroceryListMutation();
    const [deleteGroceryItem, { isDeleteGroceryItemLoading }] = useDeleteGroceryItemMutation();
    const [addGroceryItem, { isAddGroceryItemLoading }] = useAddGroceryItemMutation();
    const [updateGroceryItem, { isUpdateGroceryItemLoading }] = useUpdateGroceryItemMutation();
    const {
        data: groceryListFromAPI, // rename data to ingredients
        isLoading,
        refetch
    } = useGetGroceryListQuery();
    const location = useLocation();

    useEffect(() => {
        refetch();
    }, [location, refetch]);

    const handleTagSelectionModalClose = () => {
        setTagSelectModalOpen(false);
    };

    const handleTagSelectionConfirmSelection = async (selectedTags) => {
        try {
            await makeGroceryList({
                tag_ids: selectedTags.tag_ids.join(',')
            });
            await refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddItemModalClose = () => {
        setAddItemModalOpen(false);
    };

    const handleAddItemConfirm = async (newItem) => {
        try {
            if (newItem.id === null) {
                await addGroceryItem({
                    name: newItem.name
                });
            } else {
                await updateGroceryItem({
                    id: newItem.id,
                    name: newItem.name,
                });
            }
            await refetch();
            setAddItemModalOpenArgument(null);
            await refetch();
        } catch (error) {
            console.log(error);
        }
    };

    const handleMakeGroceryListButton = async (event) => {
        event.preventDefault();

        setTagSelectModalOpen(true);
    };

    const handleCreateNew = () => {
        const modalInformation = {
            item_info: null
        };
        setAddItemModalOpenArgument(modalInformation);
    };

    // Opening modal when modal argument is set
    useEffect(() => {
        if (addItemModalOpenArgument) {
            setAddItemModalOpen(true);
        }
    }, [addItemModalOpenArgument]);

    const handleRemoveButton = async (event, id) => {
        event.preventDefault();

        try {
            await deleteGroceryItem({
                id: id
            });
            await refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditButton = (event, item) => {
        event.preventDefault();
        
        // const modalInformation = {
        //     item_info: item
        // };
        // setAddItemModalOpenArgument(modalInformation);

        // TODO: When grocery item is ready in the backend to include categories, 
        // uncomment above and remove below
        console.log(item)
    };

    return (isLoading ||
        isMakeGroceryListLoading ||
        isDeleteGroceryItemLoading ||
        isAddGroceryItemLoading ||
        isUpdateGroceryItemLoading ? <div>Loading...</div> :
        <div>
            <div className="grocerylist-tab">GROCERY LIST</div>
            <button id="button" className="Grocbutton" onClick={handleMakeGroceryListButton}>
                <span>Make grocery list</span>
            </button>
            <button id="button" className="add-btn" onClick={() => handleCreateNew()}>
                <span>+</span>
            </button>
            <TagsSelection
                open={tagSelectModalOpen}
                handleClose={handleTagSelectionModalClose}
                handleConfirm={handleTagSelectionConfirmSelection}
            />
            <IngredientsDropDown
                open={addItemModalOpen}
                handleClose={handleAddItemModalClose}
                handleSave={handleAddItemConfirm}
                currentIngredientInfo={addItemModalOpenArgument ? addItemModalOpenArgument.item_info : null}
            />
            <div className="ingredients-container">
                {groceryListFromAPI.data.map((item) => (
                    <div className="ingredient-card" key={item.id}>
                        <span className="ingredient-title">{item.name}</span>
                        <button onClick={(event) => handleEditButton(event, item)}>
                            Edit
                        </button>
                        <button onClick={(event) => handleRemoveButton(event, item.id)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GroceryList;
