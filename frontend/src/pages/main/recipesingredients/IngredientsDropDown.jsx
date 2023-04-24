import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from '../../../features/categories/categoriesApiSlice';
import './IngredientsDropDown.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Autocomplete,
} from "@mui/material";


function IngredientsDropDown({ open, handleClose, handleSave, currentIngredientInfo = null }) {
    const [name, setName] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const {
        data: categoriesFromAPI,
        isCategoriesLoading
    } = useGetCategoriesQuery();

    useEffect(() => {
        if (currentIngredientInfo) {
            setName(currentIngredientInfo.name);
            setSelectedCategories(currentIngredientInfo.categories);
        }
    }, [currentIngredientInfo]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSelectionChange = (event, newCategory) => {
        if (!newCategory) {
            return;
        }

        const categoryExistsInSelected = selectedCategories.some((category) => category.id === newCategory.id);

        if (!categoryExistsInSelected) {
            setSelectedCategories([...selectedCategories, newCategory]);
        }
    };

    function resetData() {
        setName("");
        setSelectedCategories([]);
    }

    const handleSaveClick = async () => {
        const newIngredientInfo = {
            name: name,
            category_ids: selectedCategories.map((category) => category.id),
            id: null,
        };

        if (currentIngredientInfo && currentIngredientInfo.hasOwnProperty('id')) {
            newIngredientInfo.id = currentIngredientInfo.id;
        }

        await handleSave(newIngredientInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    }

    const removeCategory = (id) => {
        const updatedSelectedCategories = selectedCategories.filter((category) => category.id !== id);
        setSelectedCategories(updatedSelectedCategories);
    };

    return (isCategoriesLoading ? <div>Loading...</div> :
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>{currentIngredientInfo ? "Edit Ingredient" : "Add New Ingredient"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Ingredient Name"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
                <Autocomplete
                    options={categoriesFromAPI?.data || []}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    onChange={handleSelectionChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Category Search"
                            variant="outlined"
                        />
                    )}
                />
                <div className="selected-categories-container">
                    {selectedCategories.map((category) => (
                        <div className="selected-categories" key={category.id} >
                            <span className="selected_remove_item">{category.name}</span>
                            <button className="selected_remove" onClick={() => removeCategory(category.id)}>Remove</button>
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
        </Dialog>
    );
}

export default IngredientsDropDown;
