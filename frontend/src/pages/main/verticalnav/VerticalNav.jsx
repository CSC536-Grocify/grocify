import React, { useState } from "react";
import './VerticalNav.scss';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';

const VerticalNav = () => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setShowLeftButton(!showLeftButton);
  };

  const handleLogoutButtonClick = (event) => {
    event.preventDefault();

    dispatch(logOut());
    navigate('/');
  }

  return (
    <div className="nav-container">
      {showLeftButton && (
        <button className="left-btn" onClick={handleLogoutButtonClick}>
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
