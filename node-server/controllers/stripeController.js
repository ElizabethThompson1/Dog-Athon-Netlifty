const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

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

// Create checkout session
const createCheckoutSession = async (req, res) => {
  const { items } = req.body;

  try {
    // Fetch item data from Sanity
    const itemIds = items.map(item => item.id);
    const itemData = await client.fetch(`*[_id in $itemIds]`, { itemIds });
    
    // Log itemData and items to debug structure
    console.log('itemData:', itemData);
    console.log('items:', items);

    // Map items to line items for Stripe
    const lineItems = items.map(item => {
      const product = itemData.find(p => p._id === item.id);
      if (!product) {
        throw new Error(`Product with id ${item.id} not found`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title || product.name,
          },
          unit_amount: product.price * 100, 
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    console.log('session:', session);
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
