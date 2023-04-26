import React, { useState, useEffect } from "react";
import "./CategoriesManagement.scss"
import {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
} from '../../../features/categories/categoriesApiSlice';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import AddCategoryModal from './AddCategoryModal';


function CategoriesManagement({ open, handleClose }) {
    const [addCategoryOpen, setAddCategoryOpen] = useState(false);
    const [addCategoryOpenArgument, setAddCategoryOpenArgument] = useState(null);
    const [createCategory, { isCreateLoading }] = useCreateCategoryMutation();
    const [updateCategory, { isUpdateLoading }] = useUpdateCategoryMutation();
    const [deleteCategoryAPI, { isDeleteCategoryLoading }] = useDeleteCategoryMutation();
    const {
        data: categoriesFromAPI,
        isCategoriesLoading,
        refetch: refetchCategories,
    } = useGetCategoriesQuery();

    const handleCloseClick = () => {
        handleClose();
    }

    const handleCreateNew = () => {
        const modalInformation = {
            category_info: null
        };
        setAddCategoryOpenArgument(modalInformation);
    }

    // Opening modal when modal argument is set
    useEffect(() => {
        if (addCategoryOpenArgument) {
            setAddCategoryOpen(true);
        }
    }, [addCategoryOpenArgument]);

    const handleModalClose = () => {
        setAddCategoryOpenArgument(null);
        setAddCategoryOpen(false);
    };

    const handleSaveCategory = async (newCategoryInfo) => {
        try {
            if (newCategoryInfo.id === null) {
                await createCategory({
                    name: newCategoryInfo.name
                });
            } else {
                await updateCategory({
                    id: newCategoryInfo.id,
                    name: newCategoryInfo.name
                });
            }
            await refetchCategories();
            setAddCategoryOpenArgument(null);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryClick = (category) => {
        const modalInformation = {
            category_info: category
        };
        setAddCategoryOpenArgument(modalInformation);
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategoryAPI({ id });
            await refetchCategories();
            setAddCategoryOpenArgument(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (isCategoriesLoading || isCreateLoading || isUpdateLoading || isDeleteCategoryLoading ? <div>Loading...</div> :
        <Dialog  open={open} onClose={handleCloseClick}>
            <DialogTitle>Edit Categories</DialogTitle>
            <DialogContent>
                <button className="add_category" id="button" onClick={() => handleCreateNew()}>
                    <span>Add category</span>
                </button>
                <AddCategoryModal
                    open={addCategoryOpen}
                    handleClose={handleModalClose}
                    handleSave={handleSaveCategory}
                    handleDelete={handleDeleteCategory}
                    currentCategoryInfo={addCategoryOpenArgument ? addCategoryOpenArgument.category_info : null}
                />
                <div>
                    {categoriesFromAPI?.data.map((category) => (
                        <div
                            key={category.id}
                            className="category"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseClick} color="primary">
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CategoriesManagement;
