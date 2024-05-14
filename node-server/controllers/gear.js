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
// Logic for getting a gear item by ID
const getGearById = async (gearId) => {
  try {
    const gear = await client.getDocument(gearId);
    if (!gear || gear._type !== 'gear') {
      throw new Error('Gear not found');
    }
    return gear;
  } catch (error) {
    console.error('Error fetching gear:', error);
    throw new Error('Failed to fetch gear');
  }
};

const getAllGear = async (req, res) => {
  try {
    // Fetch all gear items with required fields including the image
    const gearItems = await client.fetch('*[_type == "gear"]{_id, name, price, sizes, "imageUrl": Image.asset->url}');
    res.json(gearItems);
  } catch (error) {
    console.error('Error fetching gear:', error);
    res.status(500).json({ error: 'Failed to fetch gear' });
  }
};


// Logic for adding a gear item to a cart
const addGearToCart = async (gearId, userId, guestToken) => {
  try {
    // Fetch the gear item
    const gear = await getGearById(gearId);

    // Create cart item
    const cartItem = {
      _type: 'reference',
      _ref: gearId,
    };

    // If user ID is provided, add gear item to user's cart
    if (userId) {
      // Fetch user's cart
      const userCart = await client.fetch(`*[_type == "cart" && user._ref == $userId][0]`, { userId });
      if (!userCart) {
        throw new Error('User cart not found');
      }
      // Add gear item to user's cart
      await client.patch(userCart._id).set({ items: [...userCart.items, cartItem] }).commit();
      return 'Gear item added to user cart successfully';
    }

    // If guest token is provided, add gear item to guest cart
    if (guestToken) {
      // Fetch guest cart
      const guestCart = await client.fetch(`*[_type == "cart" && guestToken == $guestToken][0]`, { guestToken });
      if (!guestCart) {
        throw new Error('Guest cart not found');
      }
      // Add gear item to guest cart
      await client.patch(guestCart._id).set({ items: [...guestCart.items, cartItem] }).commit();
      return 'Gear item added to guest cart successfully';
    }

    throw new Error('User ID or guest token must be provided');
  } catch (error) {
    console.error('Error adding gear to cart:', error);
    throw new Error('Failed to add gear to cart');
  }
};
const createGear = async (name, price, sizes, image) => {
  try {
    // Upload the image
    const uploadedImage = await client.assets.upload('image', image);

    // Create the new gear item
    const newGearItem = await client.create({
      _type: 'gear',
      name,
      price,
      sizes,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
      },
    });

    return newGearItem;
  } catch (error) {
    console.error('Error creating gear:', error);
    throw new Error('Failed to create gear');
  }
};

const deleteGearById = async (gearId) => {
  try {
    await client.delete(gearId).commit();
    return 'Gear item deleted successfully';
  } catch (error) {
    console.error('Error deleting gear:', error);
    throw new Error('Failed to delete gear');
  }
};

module.exports = {
  getGearById,
  addGearToCart,
  createGear,
  deleteGearById,
  getAllGear,
};
