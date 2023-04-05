import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './IngredientsDropDown.scss';
import { useCreateIngredientMutation } from '../../../features/recipes_ingredients/ingredientsApiSlice';

function IngredientsDropDown(event) {
    const [name, setName] = useState('');
    const [createIngredient, { isLoading }] = useCreateIngredientMutation();
    let navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            await createIngredient({ name: name }).unwrap();
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
                        <input className="fieldStylehead" placeholder="Name" type="text" value={name} onChange={handleNameChange} />
                    </label>
                </div>
                <button className="button" onClick={handleCreateSubmit}>
                    create
                </button>
            </div>
        </div>
    ));
}

export default IngredientsDropDown;
