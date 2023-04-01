// import React from "react";
import React, { useState } from 'react';
import Dropdown from "./DropDown";
import './RecipesTab.scss';


<script src="multiselect-dropdown.js"></script>


function RecipesTab() {


  
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

    return (
      <div>
        <button id="button" className="add-btn" onClick={togglePopup}>
        <span>+</span>
      </button>
      {showPopup && (
        <div className="bg-popContainer">
          <div className="pop-box">
            <div
              id="close"
              className="closer"
              onClick={() => setShowPopup(false)}
            >
              +
            </div>
            <input
              type="text"
              className="fieldStylehead"
              placeholder="Title"
            />
            {/* <div className="cont-drop">
              <div className="select-btn">
                <span className="btn-text">Search Recipe</span>
                <span className="arrow-dwn">
                  <i className="fa-solid fa-chevron-down"></i>               
                </span>
              </div>
              <ul className="list-items">
                <li className="item">
                  <span className="checkbox">
                  <i className="fa-solid fa-check check-icon"></i>
                  </span>
                  <span className="item-text">JavaScript</span>
                </li>
                <li className="item">
                  <span className="checkbox">
                  <i className="fa-solid fa-check check-icon"></i>
                  </span>
                  <span className="item-text">Node.Js</span>
                </li>
                <li className="item">
                  <span className="checkbox">
                  <i className="fa-solid fa-check check-icon"></i>
                  </span>
                  <span className="item-text">React.js</span>
                </li>
                <li className="item">
                  <span className="checkbox">
                  <i className="fa-solid fa-check check-icon"></i>
                  </span>
                  <span className="item-text">Mango DB</span>
                </li>
              </ul>
            </div> */}
            
      
          
            {/* <textarea
              type="text"
              className="fieldStylebody"
              placeholder="Enter your Recipe"
            /> */}

            <div className='h-screen grid place-item-center bg-gradient-to-r from-sky-600 to '>
              <Dropdown/>
            </div>


            <button
              type="submit"
              className="button"
              onClick={() => setShowPopup(false)}
            >
              Create
            </button>
          </div>
        </div>
      )}
              <script src='./script.jsx'></script>

        </div>
        );
      }

export default RecipesTab;



// function RecipesTab() {
//   return (
//     <div>
//       <button id="button" className="add-btn"><span>+</span></button>
//       <div class="bg-popContainer">
//               <div class="pop-box">
//                 <div id="close" class="closer" onClick={() => {
//                 document.querySelector(".bg-popContainer").style.display = "none"
//               }}>+</div>
//                 <input type="text" className="fieldStylehead" placeholder="Title"></input>
//                 <textarea type="text" className="fieldStylebody" placeholder="Enter your Recipe"></textarea>
//                 <button type="submit" className="button"  onClick={() => {
//                 document.querySelector(".bg-popContainer").style.display = "none"
//               }}>Create</button>
//               </div>
//             </div>

//       {/* <button className="add-btn">
//         <span>+</span>
//       </button> */}

//     </div>
//   )
// }

// export default RecipesTab;
