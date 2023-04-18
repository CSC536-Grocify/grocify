import React, { useState, useEffect } from "react";
import './TagDropDown.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";


function TagDropDown({ open, handleClose, handleSave, currentTagInfo = null }) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentTagInfo) {
            setName(currentTagInfo.name);
        }
    }, [currentTagInfo]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    function resetData() {
        setName("");
    }

    const handleSaveClick = async () => {
        const newTagInfo = {
            name: name,
            id: null,
        };

        if (currentTagInfo && currentTagInfo.hasOwnProperty('id')) {
            newTagInfo.id = currentTagInfo.id;
        }

        await handleSave(newTagInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>{currentTagInfo ? "Edit Tag" : "Add New Tag"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tag Name"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                />
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

export default TagDropDown;
