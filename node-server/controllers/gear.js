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

// Create a new gear
const createGear = async (req, res) => {
  const { name, price, sizes } = req.body;
  const image = req.file;

  try {
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const uploadedImage = await client.assets.upload('image', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    const newGear = await client.create({
      _type: 'gear',
      name,
      price,
      sizes: {
        small: sizes.small,
        medium: sizes.medium,
        large: sizes.large,
      },
      gearImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
      },
    });

    res.status(201).json(newGear);
  } catch (error) {
    console.error('Error creating gear:', error);
    res.status(500).json({ error: 'Failed to create gear' });
  }
};

const updateGearById = async (req, res) => {
  const { gearId } = req.params;
  const data = req.body;

  try {
    const updatedGear = await client.patch(gearId).set(data).commit();
    res.status(200).json(updatedGear);
  } catch (error) {
    console.error('Error updating gear:', error);
    res.status(500).json({ error: 'Failed to update gear' });
  }
};

const getGearById = async (req, res) => {
  const { gearId } = req.params;

  try {
    const gear = await client.getDocument(gearId);
    res.status(200).json(gear);
  } catch (error) {
    console.error('Error fetching gear:', error);
    res.status(500).json({ error: 'Failed to fetch gear' });
  }
};

const getAllGears = async (req, res) => {
  try {
    const gears = await client.fetch(`
      *[_type == "gear"]{
        _id,
        name,
        price,
        sizes,
        "imageUrl": gearImage.asset->url
      }
    `);
    res.status(200).json(gears);
  } catch (error) {
    console.error("Error fetching gears:", error);
    res.status(500).json({ error: 'Failed to fetch gears' });
  }
};

const deleteGearById = async (req, res) => {
  const { gearId } = req.params;

  try {
    await client.delete(gearId);
    res.status(200).json({ message: 'Gear deleted successfully' });
  } catch (error) {
    console.error('Error deleting gear:', error);
    res.status(500).json({ error: 'Failed to delete gear' });
  }
};

module.exports = {
  createGear,
  getAllGears,
  getGearById,
  updateGearById,
  deleteGearById,
};
