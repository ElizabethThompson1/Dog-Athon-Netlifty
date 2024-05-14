const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');


dotenv.config();

// Create the Sanity client instance
const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: false,
  token: process.env.TOKEN,
  apiVersion: "2022-02-03"
});
// Helper function to calculate total price
const calculateTotalPrice = async (items) => {
  const itemIds = items.map(item => item._ref);
  const products = await client.fetch(`*[_id in $itemIds]`, { itemIds });
  return products.reduce((total, product) => total + product.price, 0);
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { userId, guestToken, item } = req.body;
  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    let cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (!cart) {
      cart = await client.create({
        _id: cartKey,
        _type: 'cart',
        items: [item],
        totalPrice: item.price,
        user: userId ? { _type: 'reference', _ref: userId } : undefined,
        guestToken: guestToken ? guestToken : undefined,
      });
    } else {
      cart.items.push(item);
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await client.patch(cart._id).set(cart).commit();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { userId, guestToken, itemId } = req.body;
  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (cart) {
      cart.items = cart.items.filter(item => item._ref !== itemId);
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await client.patch(cart._id).set(cart).commit();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart
const getCart = async (req, res) => {
  const { userId, guestToken } = req.params;
  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  const { userId, guestToken } = req.body;
  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      await client.patch(cart._id).set(cart).commit();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCart,
  clearCart,
};
