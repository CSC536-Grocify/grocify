import React, { useState, useEffect } from "react";
import { useDeleteTagMutation, useGetTagsQuery } from '../../../features/tags/tagsApiSlice';
import { useCreateTagMutation, useUpdateTagMutation } from '../../../features/tags/tagsApiSlice';
import { useLocation } from "react-router-dom";
import TagDropDown from './TagDropDown';
import './TagsPannel.scss';


function TagsPanel() {
  const [contextMenuState, setContextMenuState] = useState({ visible: false, x: 0, y: 0, tag: null });
  const [touchTimeout, setTouchTimeout] = useState(null);


    const handleContextMenu = (event, tag) => {
        event.preventDefault();
        setContextMenuState({ visible: true, x: event.clientX, y: event.clientY, tag });
    };

    const handleCloseContextMenu = () => {
        setContextMenuState({ visible: false, x: 0, y: 0, recipe: null });
    };
    const handleTouchStart = (event, tag) => {
      setTouchTimeout(setTimeout(() => handleContextMenu(event, tag), 1000));
    };
    const handleTouchEnd = () => {
      clearTimeout(touchTimeout);
    };

    // Update the handleEditButton function
    const handleEditButton = () => {
        const modalInformation = {
            tag_info: contextMenuState.tag
        };
        setModalOpenArgument(modalInformation);
        handleCloseContextMenu();
    }

    // Add a handleRemoveButton function
    const handleRemoveButton = async (event, id) => {
        handleCloseContextMenu();
        event.preventDefault();
        try {
            await deleteTagAPI({ id: contextMenuState.tag.id}).unwrap();
            handleCloseContextMenu();
            await refetch();
        } catch (error) {
            console.error(error);
        }
    }

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

  const handleCreateNew = () => {
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
            await createTag({ name: newTagInfo.name }).unwrap();
        } else {
            await updateTag({ id: newTagInfo.id, name: newTagInfo.name }).unwrap();
          }
          await refetch();
          setModalOpenArgument(null);
        } catch (error) {
            console.error(error);
        }
  };
  

  return (isLoading ? <div>Loading...</div> : (
    <div>
        <div>Tags panel</div>
      <button id="button" className="add-btn" onClick={() => handleCreateNew()}>
                <span>+</span>
            </button>
            <TagDropDown
                open={modalOpen}
                handleClose={handleModalClose}
                handleSave={handleSaveTag}
                currentIngredientInfo={modelOpenArgument? modelOpenArgument.ingredient_info : null}
            />
            <div className="tags-container">
              {tagsFromAPI.data.map((tag) => (
                  <div className="tag-card" key={tag.id} onContextMenu={(event) => handleContextMenu(event, tag)} onTouchStart={event => handleTouchStart(event, tag)} onTouchEnd={handleTouchEnd}>
                      <span className="tag-title">{tag.name}</span>
                  </div>
              ))}
              {contextMenuState.visible && (
                <div className="context-menu" style={{ top: contextMenuState.y, left: contextMenuState.x }}>
                    <button className="Edit-btn" onClick={handleEditButton}>Edit</button>
                    <button className="Edit-btn" onClick={handleRemoveButton}>Remove</button>
                </div>
            )}
            
          </div>
    </div>
  ));
}

export default TagsPanel;

