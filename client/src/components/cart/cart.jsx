import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const Cart = () => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const guestToken = localStorage.getItem('guestToken');
            const token = userId || guestToken;

            if (token) {
                const cartData = await getCartByUserIdOrToken(token);
                setCart(cartData);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const getCartByUserIdOrToken = async (userIdOrToken) => {
        try {
            
            const response = await axios.get(`http://localhost:3309/carts/${userIdOrToken}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.SNIPCART_API_KEY}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw new Error('Failed to fetch cart');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="max-w-md bg-gray-100 rounded-md p-4">
                <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
                {cart ? (
                    <>
                        {cart.totalItems > 0 ? (
                            <>
                                <ul className="space-y-2">
                                    {cart.gears.map(gear => (
                                        <li key={gear.id} className="border-b border-gray-300 pb-2">
                                            <span className="font-semibold">{gear.name}</span>
                                            <span className="text-gray-600">${gear.cost}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-lg font-semibold mt-4">Total Price: ${cart.totalPrice}</p>
                            </>
                        ) : (
                            <p className="text-lg italic text-gray-500 mt-4">No items in the cart</p>
                        )}
                    </>
                ) : (
                    <>
                        <p className="text-lg">Loading cart...</p>
                        <p className="text-lg mt-4">Total Price: $0</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
