import React from "react";
import { useNavigate } from "react-router-dom";
import {BiChevronDown} from 'react-icons/bi'
import './RecipePop.scss';

function RecipesPop() {
    let navigate = useNavigate();

        return (
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
                    </div>
                </div>
        )
}

export default RecipesPop;