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


const createEvent = async (name, date, distance, price, distances) => {
  try {

    const uploadedImage = await client.assets.upload('image', image);

    // Create a new event in the database with the reference to the uploaded image
    const newEvent = await client.create({
      _type: 'event',
      name,
      date,
      description,
      price,
      distance,
      Image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: uploadedImage._id,
        },
      },
    });

    return newEvent
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }
};

const updateEventById = async (eventId, data) => {
  try {
    const updatedEvent = await client.patch(eventId).set(data).commit();
    return updatedEvent;
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }
};

const getEventById = async (eventId) => {
  try {
    const event = await client.getDocument(eventId);
    return event;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw new Error('Failed to fetch event');
  }
};

// Logic for retrieving all events
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
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Logic for deleting an event by ID
const deleteEventById = async (eventId) => {
  try {
    await client.delete(eventId).commit();
    return 'Event deleted successfully';
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
};


module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
