import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentTokens } from '../../features/auth/authSlice';


const useAuth = () => {
    const accessToken = useSelector(selectCurrentTokens);
    const isAuthenticated = !!accessToken;
    return isAuthenticated;
};

const RequireAuth = ({ children }) => {
    const isAuthenticated = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
