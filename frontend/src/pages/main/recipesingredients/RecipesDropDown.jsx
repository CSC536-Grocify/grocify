import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './RecipesDropDown.scss';
import { useCreateRecipeMutation } from '../../../features/recipes_ingredients/recipesApiSlice';
import { useDispatch } from 'react-redux';
import { addOrUpdateRecipe } from '../../../features/recipes_ingredients/recipesSlice';


function RecipesDropDown(event) {
    const [title, setTitle] = useState('');
    const [createRecipe, { isLoading }] = useCreateRecipeMutation();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data: recipe } = await createRecipe({ title: title, description:'NA' }).unwrap();
            dispatch(addOrUpdateRecipe(recipe));
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    return ( isLoading ? <div>Loading...</div> : (
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
                <button className="button" onClick={handleCreateSubmit}>
                    create
                </button>
            </div>
        </div>
    ));
}

export default RecipesDropDown;