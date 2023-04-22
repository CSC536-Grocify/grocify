import React, { useState } from "react";
import './VerticalNav.scss';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';

const VerticalNav = () => {
    const [showLogOutOption, setShowLogOutOption] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        setShowLogOutOption(!showLogOutOption);
    };

    const handleLogoutButtonClick = (event) => {
        event.preventDefault();

        dispatch(logOut());
        navigate('/');
    }

    return (
        <div className="nav-container">
            {showLogOutOption && (
                <button className="left-btn" onClick={handleLogoutButtonClick}>
                    Log out
                </button>
            )}
            <div className="vertical-nav">
                <button className="bottom-btn" onClick={handleButtonClick}>
                    <FaUser />
                </button>
                <button className="bottom-btn" onClick={handleButtonClick}>
                    <FaUser />
                </button>
            </div>
        </div>
    );
};

export default VerticalNav;
