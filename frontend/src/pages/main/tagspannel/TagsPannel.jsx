import React, { useState, useEffect } from "react";
import { useDeleteTagMutation, useGetTagsQuery } from '../../../features/tags/tagsApiSlice';
import { useCreateTagMutation, useUpdateTagMutation } from '../../../features/tags/tagsApiSlice';
import { useLocation } from "react-router-dom";
import TagDropDown from './TagDropDown';
import './TagsPannel.scss';


function TagsPanel() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modelOpenArgument, setModalOpenArgument] = useState(null);
  const [createTag, { isCreateLoading }] = useCreateTagMutation();
  const [updateTag, { isUpdateLoading }] = useUpdateTagMutation();
  const [deleteTagAPI, { isDeleteTagLoading }] = useDeleteTagMutation();
  const {
    data: tagsFromAPI,
    isLoading,
    refetch
  } = useGetTagsQuery();

  const location = useLocation();
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const handleCreateNew = (event) => {
    event.preventDefault();

    const modalInformation = {
      tag_info: null
    };

    setModalOpenArgument(modalInformation);
  };

  // Opening modal when modal argument is set
  useEffect(() => {
    if (modelOpenArgument) {
      setModalOpen(true);
    }
  }, [modelOpenArgument]);

  const handleModalClose = () => {
    setModalOpenArgument(null);
    setModalOpen(false);
  };

  const handleSaveTag = async (newTagInfo) => {
    try {
      if (newTagInfo.id === null) {
        await createTag({
          name: newTagInfo.name,
          recipe_ids: newTagInfo.recipe_ids.join(',')
        }).unwrap();
      } else {
        await updateTag({
          id: newTagInfo.id,
          name: newTagInfo.name,
          recipe_ids: newTagInfo.recipe_ids.join(',')
        }).unwrap();
      }
      await refetch();
      setModalOpenArgument(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTag = async (id) => {
    try {
      await deleteTagAPI({ id }).unwrap();
      await refetch();
      setModalOpenArgument(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTagClick = (event, tag) => {
    event.preventDefault();

    const modalInformation = {
      tag_info: tag
    };

    setModalOpenArgument(modalInformation);
  };

  return (isLoading || isCreateLoading || isUpdateLoading || isDeleteTagLoading ? <div>Loading...</div> : (
    <div>
      <div>Tags panel</div>
      <button id="button" className="add-btn" onClick={(event) => handleCreateNew(event)}>
        <span>+</span>
      </button>
      <TagDropDown
        open={modalOpen}
        handleClose={handleModalClose}
        handleSave={handleSaveTag}
        handleDelete={handleDeleteTag}
        currentTagInfo={modelOpenArgument ? modelOpenArgument.tag_info : null}
      />
      <div className="tags-container">
        {tagsFromAPI.data.map((tag) => (
          <div
            className="tag-card"
            key={tag.id}
            onClick={(event) => handleTagClick(event, tag)}
          >
            <span className="tag-title">{tag.name}</span>
          </div>
        ))}
      </div>
    </div>
  ));
}

export default TagsPanel;
