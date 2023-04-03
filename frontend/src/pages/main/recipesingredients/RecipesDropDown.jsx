import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './RecipesDropDown.scss';
import { Multiselect } from 'multiselect-react-dropdown';
import { useCreateRecipeMutation } from '../../../features/recipes_ingredients/recipesApiSlice';


const objectArray = [
    { key: 'banana', value: 'Apple' },
    { key: 'apple', value: 'Banana' },
    { key: 'orange', value: 'Orange' },
    { key: 'grapes', value: 'Grapes' }
  ];

function RecipesDropDown(event) {
    const [title, setTitle] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [createRecipe, { isLoading }] = useCreateRecipeMutation();
    let navigate = useNavigate();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSelect = (selectedList, selectedItem) => {
        setSelectedItems(selectedList);
        console.log(selectedItems);
    };

    const handleRemove = (selectedList, removedItem) => {
        setSelectedItems(selectedList);
        console.log(selectedItems);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            const recipeData = await createRecipe({ title: title, description:'NA' }).unwrap();
            console.log(recipeData);
            navigate('/main');
        } catch (error) {
            console.error(error);
        }
    }

    const divStyle ={
        margin: 100,
        width: 300
    }

    const handleCreate = () => {
        console.log("Selected Items:", selectedItems);
        // Add your logic to create something with the selected items here
    };

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
                {/* <button className="button" onClick={handleCreate}> */}
                <button className="button" onClick={handleCreateSubmit}>
                    create
                </button>
            </div>
        </div>
    ));
}

export default RecipesDropDown;