import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';  // Importar UserContext
import logo from '../assets/img/logo.png';

export const Navbar = () => {
    const { totalPrice } = useContext(CartContext);
    const { token, logout } = useContext(UserContext);  // Obtener token y logout desde el UserContext

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand col-md-2" to="/">
                    <img className="logo-header" src={logo} alt="logo" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">🍕 Home</Link>
                        </li>
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">🔓 Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={logout}>🔒 Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">🔐 Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">🔐 Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <Link className="btn btn-primary" to="/cart">
                        🛒 Total: ${totalPrice ? totalPrice.toLocaleString() : '0'}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;