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

const createCheckoutSession = async (req, res) => {
  const { items } = req.body;

  try {
    // Fetch gear or events data from Sanity
    const itemData = await client.fetch('*[_type == "gear" || _type == "event"]');

    const lineItems = items.map(item => {
      const product = itemData.find(p => p._id === item.id);
      if (!product) {
        throw new Error(`Product with id ${item.id} not found`);
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
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

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCheckoutSession,
};
