import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './IngredientsDropDown.scss';
import { useCreateIngredientMutation, useUpdateIngredientMutation } from '../../../features/recipes_ingredients/ingredientsApiSlice';


function IngredientsDropDown() {
    const [name, setName] = useState('');
    const [createIngredient, { isLoading }] = useCreateIngredientMutation();
    const [updateIngredient, { isUpdateLoading }] = useUpdateIngredientMutation();
    let navigate = useNavigate();
    const location = useLocation();
    const ingredientId = location?.state?.data?.ingredient_id;
    const ingredientName = location?.state?.data?.ingredient_name;
    const backToAddr = location?.state?.data?.back_to_addr;

    // Only load the ingredient info after component is mounted
    useEffect(() => {
        if (ingredientName) {
            setName(ingredientName);
        }
    }, [ingredientName]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleCreateSubmit = async (event) => {
        event.preventDefault();

        try {
            await createIngredient({ name: name }).unwrap();

            if (backToAddr) {
                navigate(backToAddr);
            } else {
                navigate('/main');
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleSaveSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateIngredient({ name: name, id: ingredientId }).unwrap();

            if (backToAddr) {
                navigate(backToAddr);
            } else {
                navigate('/main');
            }
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
                        if (backToAddr) {
                            navigate(backToAddr);
                        } else {
                            navigate('/main');
                        }
                    }}
                >
                    +
                </div>
                <div>
                    <label>
                        <input className="fieldStylehead" placeholder="Name" type="text" value={name} onChange={handleNameChange} />
                    </label>
                </div>
                {!ingredientId ? (
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

export default IngredientsDropDown;
