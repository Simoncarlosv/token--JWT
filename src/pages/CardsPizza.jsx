import React from 'react';
import { Link } from 'react-router-dom';

export const CardsPizza = ({ id, titulo, ingredientes, precio, img, descripcion, onAddToCart }) => {
    return (
        <div className="card">
            <img src={img} className="card-img-top" alt={titulo} />
            <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
                <p className="card-text">🍕 Ingredientes: {ingredientes.join(', ')}</p>
                <p className="card-text">Precio: {precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                <button className="btn btn-primary me-2" onClick={onAddToCart}>Añadir</button>
                <Link to={`/pizza/${id}`} className="btn btn-secondary">Ver Más</Link> {/* Enlace a la página de detalles */}
            </div>
        </div>
    );
};

export default CardsPizza;