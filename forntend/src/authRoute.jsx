import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element }) => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    // If token is not present, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If token is present, render the element (the Dashboard component)
    return element;
};

export default AuthRoute;
