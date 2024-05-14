const express = require('express');
const router = express.Router();
const {createEvent, getAllEvents, getEventById, updateEventById, deleteEventById} = require("../controllers/event")

// Add multer middleware before your route
router.post('/create',  createEvent); // Create a new event with image upload
router.get('/',getAllEvents);
router.get('/:eventId', getEventById); // Get event by ID
router.put('/:eventId', updateEventById); // Update event by ID
router.delete('/:eventId', deleteEventById); // Delete event by ID

module.exports = router;
