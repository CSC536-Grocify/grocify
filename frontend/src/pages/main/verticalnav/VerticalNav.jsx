import React, { useState } from "react";
import './VerticalNav.scss';
import { FaUser } from 'react-icons/fa';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logOut } from '../../../features/auth/authSlice';
import CategoriesManagement from '../modals/CategoriesManagement';


const VerticalNav = () => {
    const [showLogOutOption, setShowLogOutOption] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleUserButtonClick = () => {
        setShowLogOutOption(!showLogOutOption);
    };

    const handleSettingsButtonClick = () => {
        setModalOpen(true);
    };

    const handleLogoutButtonClick = (event) => {
        event.preventDefault();

        dispatch(logOut());
        navigate('/');
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleConfirmSetting = (setting) => {
        console.log("Confirm setting");
    };

    return (
        <div className="nav-container">
            {showLogOutOption && (
                <button className="left-btn" onClick={handleLogoutButtonClick}>
                    Log out
                </button>
            )}
            <CategoriesManagement
                open={modalOpen}
                handleClose={handleModalClose}
                handleConfirm={handleConfirmSetting}
            />
            <div className="vertical-nav">
                <button className="bottom-btn" onClick={handleSettingsButtonClick}>
                    <SettingsIcon />
                </button>
                <button className="bottom-btn" onClick={handleUserButtonClick}>
                    <FaUser />
                </button>
            </div>
        </div>
    );
};

export default VerticalNav;
