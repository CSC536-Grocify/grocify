import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectCurrentTokens } from '../../features/auth/authSlice';


const useAuth = () => {
    const accessToken = useSelector(selectCurrentTokens);
    const isAuthenticated = !!accessToken;
    return isAuthenticated;
};

const ProtectedRoutes = () => {
    const isAuthenticated = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return <Outlet />;
};

export default ProtectedRoutes;
