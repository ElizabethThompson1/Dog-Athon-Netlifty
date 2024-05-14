const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config();

const client = createClient({
  projectId: process.env.PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: false,
  token: process.env.TOKEN,
  apiVersion: "2022-02-03" 
});

const calculateTotalPrice = async (items) => {
  const itemIds = items.map(item => item._ref);
  const products = await client.fetch(`*[_id in $itemIds]`, { itemIds });
  return products.reduce((total, product) => total + product.price, 0);
};

const addItemToCart = async (req, res) => {
  const { userId, guestToken, item } = req.body;
  const cartKey = userId ? `cart-${userId}` : `cart-${guestToken}`;

  try {
    console.log(`userId: ${userId}`);
    console.log(`guestToken: ${guestToken}`);
    console.log(`item: ${JSON.stringify(item)}`);

    // Fetch existing cart
    let cart = await client.fetch(`*[_type == "cart" && _id == $cartKey][0]`, { cartKey });

    if (!cart) {
      // Create a new cart if none exists
      cart = await client.create({
        _id: cartKey,
        _type: 'cart',
        items: [{ _ref: item._id, _type: 'reference' }],
        totalPrice: item.price,
        user: userId ? { _type: 'reference', _ref: userId } : undefined,
        guestToken: guestToken || undefined,
      });
    } else {
      // Update existing cart
      cart.items.push({ _ref: item._id, _type: 'reference' });
      cart.totalPrice = await calculateTotalPrice(cart.items);
      await client.patch(cart._id).set(cart).commit();
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    console.error('Error details:', error);
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
