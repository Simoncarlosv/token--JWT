import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(UserContext);  // Obtener el token del UserContext

    // Si el usuario no tiene un token (no está autenticado), redirigir a la página de login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;