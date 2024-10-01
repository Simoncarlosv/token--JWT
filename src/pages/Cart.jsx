import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const { token } = useContext(UserContext);
    const [message, setMessage] = useState('');

    const handleCheckout = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/checkouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cart: cartItems,
                }),
            });

            if (!response.ok) {
                throw new Error("Error en el proceso de compra");
            }

            setMessage("¡Compra realizada con éxito!");
            clearCart(); // Limpiar el carrito después de una compra exitosa
        } catch (error) {
            setMessage("Hubo un problema con la compra. Por favor, inténtalo nuevamente.");
        }
    };

    const handleDecreaseQuantity = (pizzaId) => {
        decreaseQuantity(pizzaId);
        const pizza = cartItems.find((item) => item.id === pizzaId);
        if (pizza && pizza.quantity === 1) {
            removeFromCart(pizzaId);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Carrito de Compras</h2>
            {cartItems.length > 0 ? (
                <>
                    <ul className="list-group">
                        {cartItems.map((pizza) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={pizza.id}>
                                <div className="d-flex align-items-center">
                                    <img src={pizza.img} alt={pizza.name} style={{ width: '50px', marginRight: '10px' }} />
                                    <span>{pizza.name} - {pizza.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                                </div>
                                <div>
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleDecreaseQuantity(pizza.id)}>-</button>
                                    <span className="mx-2">{pizza.quantity}</span>
                                    <button className="btn btn-secondary btn-sm" onClick={() => increaseQuantity(pizza.id)}>+</button>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => removeFromCart(pizza.id)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3 className="mt-3">Total: {totalPrice.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</h3>
                    <button
                        className="btn btn-primary mt-3"
                        disabled={!token}
                        onClick={handleCheckout}
                    >
                        Pagar
                    </button>
                    {message && (
                        <div className={`mt-3 alert ${message === '¡Compra realizada con éxito!' ? 'alert-success' : 'alert-danger'}`}>
                            {message}
                        </div>
                    )}
                </>
            ) : (
                <div className="alert alert-warning mt-3">Tu carrito está vacío.</div>
            )}
        </div>
    );
};

export default Cart;