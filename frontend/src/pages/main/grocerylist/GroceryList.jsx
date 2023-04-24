import React, { useState, useEffect } from "react";
import './GroceryList.scss';
import { useLocation } from "react-router-dom";
import TagsSelection from './TagsSelection';
import AddItemPopup from "./AddItemPopup";
import {
    useGetGroceryListQuery,
    useMakeGroceryListMutation,
    useDeleteGroceryItemMutation,
} from '../../../features/grocery_list/groceryListApiSlice';


function GroceryList() {
    const [tagSelectModalOpen, setTagSelectModalOpen] = useState(false);
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [addItemModalOpenArgument, setAddItemModalOpenArgument] = useState(null);
    const [makeGroceryList, { isMakeGroceryListLoading }] = useMakeGroceryListMutation();
    const [deleteGroceryItem, { isDeleteGroceryItemLoading }] = useDeleteGroceryItemMutation();
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

    const handleAddItemConfirm = (newItem) => {
        console.log(newItem);
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

    return (isLoading || isMakeGroceryListLoading || isDeleteGroceryItemLoading ? <div>Loading...</div> :
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
            <AddItemPopup
                open={addItemModalOpen}
                handleClose={handleAddItemModalClose}
                handleConfirm={handleAddItemConfirm}
                currentItemInfo={addItemModalOpenArgument ? addItemModalOpenArgument.item_info : null}
            />
            <div className="ingredients-container">
                {groceryListFromAPI.data.map((item) => (
                    <div className="ingredient-card" key={item.id}>
                        <span className="ingredient-title">{item.name}</span>
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
