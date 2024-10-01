import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';
import CardsPizza from './CardsPizza';
import { CartContext } from '../context/CartContext'; // Importar el contexto del carrito

export const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const { addToCart } = useContext(CartContext); // Obtener la función para agregar al carrito desde el contexto

    // Consumir la API de pizzas
    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pizzas');
                const data = await response.json();
                setPizzas(data);
            } catch (error) {
                console.error("Error fetching pizzas:", error);
            }
        };
        fetchPizzas();
    }, []);

    return (
        <>
            <Header />
            <div className='container'>
                <div className='row'>
                    {pizzas?.map((pizza) => (
                        <div className='col-md-4 col-xs-12 caja-cards' key={pizza.id}>
                            <CardsPizza 
                                id={pizza.id}
                                titulo={pizza.name} 
                                ingredientes={pizza.ingredients} 
                                precio={pizza.price} 
                                img={pizza.img}
                                descripcion={pizza.desc}
                                // Agregar pizza al carrito al hacer clic en este botón
                                onAddToCart={() => addToCart(pizza)} // Llamar la función addToCart con la pizza
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;