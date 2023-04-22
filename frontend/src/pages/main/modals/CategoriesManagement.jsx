import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";


function CategoriesManagement({ open, handleClose, handleConfirm }) {
    const resetData = () => {
        // TODO: reset data
        console.log("Reset data");
    };

    const handleConfirmClick = async () => {
        // TODO: confirm button click with correct data
        await handleConfirm(null);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>Edit Categories</DialogTitle>
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

export default CategoriesManagement;
