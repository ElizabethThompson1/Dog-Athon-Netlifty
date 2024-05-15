import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

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
      const response = await axios.get(`${apiUrl}/cart/${userIdOrToken}`, {
        headers: {
          'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Failed to fetch cart');
    }
  };

  const handleCheckout = async () => {
    try {
      const session = await axios.post(`${apiUrl}/stripe/create-checkout-session`, {
        items: cart.items.map(item => ({
          id: item._id,
          quantity: 1, // Assuming quantity is 1 for simplicity; adjust as necessary
        }))
      });

      window.location.href = session.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md bg-white rounded-md p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart ? (
          <>
            {cart.items.length > 0 ? (
              <>
                <ul className="space-y-2">
                  {cart.items.map(item => (
                    <li key={item._id} className="flex items-center space-x-4 border-b border-gray-300 pb-2">
                      <img src={item.imageUrl} alt={item.name || item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.name || item.title}</span>
                        <span className="text-gray-600">${item.price}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-gray-300 pt-4">
                  <p className="text-lg font-semibold">Total Price: ${cart.totalPrice}</p>
                  <button
                    onClick={handleCheckout}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Checkout
                  </button>
                </div>
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
