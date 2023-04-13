import React, { useState, useEffect } from "react";
import './IngredientsDropDown.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";


function IngredientsDropDown({ open, handleClose, handleSave, currentIngredientInfo = null }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentIngredientInfo) {
            setName(currentIngredientInfo.name);
        }
    }, [currentIngredientInfo]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSaveClick = async () => {
        const newIngredientInfo = {
            name: name,
            id: null,
        };

        if (currentIngredientInfo && currentIngredientInfo.hasOwnProperty('id')) {
            newIngredientInfo.id = currentIngredientInfo.id;
        }

        await handleSave(newIngredientInfo);
        setName("");
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
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
