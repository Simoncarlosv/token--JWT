import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1 className="display-3 text-danger">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="lead mb-4">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary btn-lg">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;