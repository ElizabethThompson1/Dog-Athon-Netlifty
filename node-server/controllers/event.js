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

// Create a new event
const createEvent = async (req, res) => {
  const { name, date, description, price, distance } = req.body;
  const image = req.file;

  try {
    if (!image) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const uploadedImage = await client.assets.upload('image', image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    const newEvent = await client.create({
      _type: 'event',
      name,
      date,
      description,
      price,
      distance,
      eventImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
      },
    });

    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

const updateEventById = async (req, res) => {
  const { eventId } = req.params;
  const data = req.body;

  try {
    const updatedEvent = await client.patch(eventId).set(data).commit();
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

const getEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await client.getDocument(eventId);
    res.status(200).json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await client.fetch(`
      *[_type == "event"]{
        _id,
        name,
        title,
        description,
        address,
        day,
        month,
        year,
        price,
        distance,
        "imageUrl": eventImage.asset->url
      }
    `);
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const deleteEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    await client.delete(eventId);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
