import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";


function AddItemPopup({ open, handleClose, handleConfirm, currentItemInfo = null }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentItemInfo) {
            setName(currentItemInfo.name);
        }
    }, [currentItemInfo]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    function resetData() {
        setName("");
    }

    const handleConfirmClick = async () => {
        const newItemInfo = {
            name: name,
            id: null,
        };

        if (currentItemInfo && currentItemInfo.hasOwnProperty('id')) {
            newItemInfo.id = currentItemInfo.id;
        }

        await handleConfirm(newItemInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>{currentItemInfo ? "Edit Item" : "Add New Item"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Item Name"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseClick} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleConfirmClick} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddItemPopup;
