import React, { useState } from "react";
import { useGetTagsQuery } from '../../../features/tags/tagsApiSlice';
import './TagsSelection.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Autocomplete,
} from "@mui/material";


function TagsSelection({ open, handleClose, handleConfirm }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const {
        data: tagsFromAPI,
        isLoading
    } = useGetTagsQuery();

    const resetData = () => {
        setSelectedTags([]);
    };

    const handleSelectionChange = (event, newTag) => {
        if (newTag) {
            const tagExistsInAPI = tagsFromAPI?.data.some((tag) => tag.id === newTag.id);

            if (tagExistsInAPI) {
                addTagToSelectedTags(newTag);
            }
        }
    };

    const addTagToSelectedTags = (newTag) => {
        const tagExists = selectedTags.some((tag) => tag.id === newTag.id);

        if (!tagExists) {
            setSelectedTags([...selectedTags, newTag]);
        }
    };

    const handleConfirmClick = async () => {
        const newTagsInfo = {
            tag_ids: selectedTags.map((tag) => tag.id)
        };

        await handleConfirm(newTagsInfo);
        resetData();
        handleClose();
    };

    const handleCloseClick = () => {
        resetData();
        handleClose();
    }

    const removeTag = (id) => {
        const updatedSelectedTags = selectedTags.filter((tag) => tag.id !== id);
        setSelectedTags(updatedSelectedTags);
    };

    return (isLoading ? <div>Loading...</div> :
        <Dialog open={open} onClose={handleCloseClick}>
            <DialogTitle>Select tags to make grocery list</DialogTitle>
            <DialogContent>
                <Autocomplete
                    // when the component is initially rendered, the data from the API might not be available yet
                    options={tagsFromAPI?.data || []}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    onChange={handleSelectionChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tag Search"
                            variant="outlined"
                        />
                    )}
                />
                <div className="selected-tags-container">
                    {selectedTags.map((tag) => (
                        <div className="selected-tags" key={tag.id}>
                            <span className="selected_remove_item">{tag.name}</span>
                            <button className="selected_remove" onClick={() => removeTag(tag.id)}>Remove</button>
                        </div>
                    ))}
                </div>
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

export default TagsSelection;
