import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './RecipesDropDown.scss';
import { useCreateRecipeMutation, useUpdateRecipeMutation } from '../../../features/recipes_ingredients/recipesApiSlice';


function RecipesDropDown() {
    const [title, setTitle] = useState('');
    const [createRecipe, { isLoading }] = useCreateRecipeMutation();
    const [updateRecipe, { isUpdateLoading }] = useUpdateRecipeMutation();
    let navigate = useNavigate();
    const location = useLocation();
    const recipeInfo = location.state?.data;

    // Only load the recipe info after component is mounted
    useEffect(() => {
        if (recipeInfo) {
            setTitle(recipeInfo.title);
        }
    }, [recipeInfo]);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            await createRecipe({ title: title, description: 'NA' }).unwrap();
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateRecipe({ title: title, id: recipeInfo.id }).unwrap();
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    return (isLoading || isUpdateLoading ? <div>Loading...</div> : (
        <div className="bg-popContainer">
            <div className="pop-box">
                <div
                    id="close"
                    className="closer"
                    onClick={() => {
                        navigate("/main");
                    }}
                >
                    +
                </div>
                <div>
                    <label>
                        <input className="fieldStylehead" placeholder="Title" type="text" value={title} onChange={handleTitleChange} />
                    </label>
                    {/* <Multiselect
                        options={objectArray}
                        displayValue="key"
                        isMulti
                        closeMenuOnSelect={false}
                        showCheckbox={true}
                        onSelect={handleSelect}
                        onRemove={handleRemove}
                    /> */}
                    {/* <div>
                        <div>Selected Items:</div>
                        {selectedItems.map((item) => (
                        <div key={item.value}>{item.key}</div>
                        ))}
                    </div> */}
                </div>
                {!recipeInfo ? (
                    <button className="button" onClick={handleCreateSubmit}>
                        Create
                    </button>
                ) : (
                    <button className="button" onClick={handleSaveSubmit}>
                        Save
                    </button>
                )}
            </div>
        </div>
    ));
}

export default RecipesDropDown;
