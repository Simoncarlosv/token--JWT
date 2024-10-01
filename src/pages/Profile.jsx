import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { getProfile, logout } = useContext(UserContext); // Asegúrate de obtener getProfile
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getProfile(); // Usa getProfile aquí
                setUserEmail(profile.email); // Establecer el email del usuario en el estado
            } catch (error) {
                console.error("Error al obtener el perfil del usuario:", error);
                // Redirigir al usuario al login si no está autenticado
                navigate('/login');
            }
        };
        fetchProfile();
    }, [getProfile, navigate]);

    const handleLogout = () => {
        logout(); // Cerrar sesión
        navigate('/login'); // Redirigir al usuario al login
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card text-center shadow-lg" style={{ maxWidth: '400px' }}>
                <div className="card-header bg-primary text-white">
                    <h4>Perfil de Usuario</h4>
                </div>
                <div className="card-body">
                    <img 
                        src="https://via.placeholder.com/150" 
                        alt="User Avatar" 
                        className="rounded-circle mb-4 img-thumbnail" 
                    />
                    <h5 className="card-title">Bienvenido</h5>
                    <p className="card-text text-muted mb-4">
                        <strong>Email:</strong> {userEmail}
                    </p>
                    <button className="btn btn-outline-primary btn-block" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;