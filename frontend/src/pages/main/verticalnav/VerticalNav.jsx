import React, { useState } from "react";
import './VerticalNav.scss';
import { FaUser } from 'react-icons/fa';

const VerticalNav = () => {
  const [showLeftButton, setShowLeftButton] = useState(false);

  const handleButtonClick = () => {
    setShowLeftButton(!showLeftButton);
  };

  return (
    <div className="nav-container">
      {showLeftButton && (
        <button className="left-btn">
          Log out
        </button>
      )}
      <div className="vertical-nav">
        <button className="bottom-btn" onClick={handleButtonClick}>
          <FaUser />
        </button>
      </div>
    </div>
  );
};

export default VerticalNav;
