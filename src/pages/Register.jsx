import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        if (!email || !password || !confirmPassword) {
            setMessage('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            setMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llamar al método register del contexto con un objeto de usuario
            await register({ email, password });
            setMessage('¡Registro exitoso!');
            // Redirigir al usuario a la página de inicio de sesión o al perfil
            navigate('/profile');
        } catch (error) {
            // Mostrar mensaje de error basado en la respuesta del backend
            const errorMessage = error.response?.data?.message || 'Error al registrarse. Por favor, inténtalo de nuevo.';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <h2>Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="confirmPassword" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
                {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
        </div>
    );
};

export default Register;