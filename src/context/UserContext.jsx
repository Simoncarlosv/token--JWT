import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [email, setEmail] = useState(null);

    // Método para hacer login
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setEmail(data.email);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // Método para hacer registro
    const register = async ({ email, password }) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setEmail(data.email);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    // Método para hacer logout
    const logout = () => {
        setToken(null);
        setEmail(null);
    };

    // Método para obtener el perfil del usuario autenticado
    const getProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;  // Retorna el perfil del usuario
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener el perfil del usuario');
            }
        } catch (error) {
            console.error('Get profile failed:', error);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
            {children}
        </UserContext.Provider>
    );
};