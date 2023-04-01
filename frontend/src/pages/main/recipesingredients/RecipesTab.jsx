// import React from "react";
import React, { useState } from 'react';
import './RecipesTab.scss';
import { useNavigate } from "react-router-dom";





function RecipesTab() {
  let navigate = useNavigate();

    return (
      <div>
        <button id="button" className="add-btn" onClick={() => {
          navigate("/Recipepop");
        }}>
        <span>+</span>
      </button>
      </div>

      );
      }

export default RecipesTab;

