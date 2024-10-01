import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito

const Pizza = () => {
    const { id } = useParams();  // Obtener el id de la pizza desde la URL
    const [pizza, setPizza] = useState(null);
    const { addToCart } = useContext(CartContext); // Obtener la función para añadir al carrito desde el contexto

    // Consumir la API para obtener los detalles de una pizza específica (usando el id dinámico)
    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
                const data = await response.json();
                setPizza(data);
            } catch (error) {
                console.error("Error fetching pizza details:", error);
            }
        };
        fetchPizza();
    }, [id]);

    if (!pizza) {
        return <div>Cargando detalles de la pizza...</div>;
    }

    return (
        <div className="container">
            <div className="card">
                <img src={pizza.img} alt={pizza.name} className="card-img-top" />
                <div className="card-body">
                    <h2 className="card-title">{pizza.name}</h2>
                    <p className="card-text"><strong>Ingredientes:</strong> {pizza.ingredients.join(', ')}</p>
                    <p className="card-text"><strong>Precio:</strong> {pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                    <p className="card-text"><strong>Descripción:</strong> {pizza.desc}</p>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => addToCart(pizza)} // Llamar a la función addToCart con la pizza actual
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pizza;