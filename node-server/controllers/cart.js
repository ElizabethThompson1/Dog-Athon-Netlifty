const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Load environment variables from .env file
dotenv.config();

// Create the Sanity client instance
const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: false,
  token: process.env.TOKEN,
  apiVersion: "2022-02-03"
});

// Calculate total price from cart items
const calculateTotalPrice = async (items) => {
  const products = await getItemDetails(items);
  return products.reduce((total, product) => total + (product.price || 0), 0);
};

// Add item to cart
const addItemToCart = async (req, res) => {
  const { userId, guestToken, item } = req.body;
  if (!userId && !guestToken) {
    return res.status(400).json({ error: 'User ID or Guest Token is required' });
  }

  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    let cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (!cart) {
      cart = await client.create({
        _type: 'cart',
        items: [{ _ref: item._id, _type: 'reference' }],
        totalPrice: item.price || 0,
        user: userId ? { _type: 'reference', _ref: userId } : undefined,
        guestToken: guestToken || undefined,
      });
    } else {
      cart.items.push({ _ref: item._id, _type: 'reference' });
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await client.patch(cart._id).set({ items: cart.items, totalPrice: cart.totalPrice }).commit();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { userId, guestToken, itemId } = req.body;
  if (!userId && !guestToken) {
    return res.status(400).json({ error: 'User ID or Guest Token is required' });
  }

  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (cart) {
      cart.items = cart.items.filter(item => item._ref !== itemId);
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await client.patch(cart._id).set({ items: cart.items, totalPrice: cart.totalPrice }).commit();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get cart
const getItemDetails = async (itemRefs) => {
  const itemIds = itemRefs.map(ref => ref._ref);
  const items = await client.fetch(`*[_id in $itemIds] { _id, _type, title, name, price, "image": image.asset->url }`, { itemIds });
  return items;
};

// Get cart
const getCart = async (req, res) => {
  const { userId, guestToken } = req.params;
  if (!userId && !guestToken) {
    return res.status(400).json({ error: 'User ID or Guest Token is required' });
  }

  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });
    if (cart) {
      cart.items = await getItemDetails(cart.items);
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  const { userId, guestToken } = req.body;
  if (!userId && !guestToken) {
    return res.status(400).json({ error: 'User ID or Guest Token is required' });
  }

  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    const cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      await client.patch(cart._id).set({ items: cart.items, totalPrice: cart.totalPrice }).commit();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  getCart,
  clearCart,
  getItemDetails
};
