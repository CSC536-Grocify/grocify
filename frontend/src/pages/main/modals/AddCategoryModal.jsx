import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";


function AddCategoryModal({ open, handleClose, handleSave, handleDelete, currentCategoryInfo = null }) {
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (currentCategoryInfo) {
            setCategoryName(currentCategoryInfo.name);
        }
    }, [currentCategoryInfo]);

    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    function resetData() {
        setCategoryName("");
    }

    const handleSaveClick = async () => {
        const newCategoryInfo = {
            name: categoryName,
            id: null,
        };

        if (currentCategoryInfo && currentCategoryInfo.hasOwnProperty('id')) {
            newCategoryInfo.id = currentCategoryInfo.id;
        }

        await handleSave(newCategoryInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    };

    const handleDeleteClick = async () => {
        await handleDelete(currentCategoryInfo.id);
        resetData();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>{currentCategoryInfo ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Category Name"
                    fullWidth
                    value={categoryName}
                    onChange={handleCategoryNameChange}
                />
            </DialogContent>
            <DialogActions>
                {currentCategoryInfo && currentCategoryInfo.hasOwnProperty('id') && (
                    <Button onClick={handleDeleteClick} color="primary">
                        Delete
                    </Button>
                )}
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

export default AddCategoryModal;
