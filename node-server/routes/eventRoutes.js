const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createEvent, getAllEvents, getEventById, updateEventById, deleteEventById } = require('../controllers/event');

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post('/create', upload.single('image'), createEvent); // Create a new event with image upload
router.get('/', getAllEvents);
router.get('/:eventId', getEventById); // Get event by ID
router.put('/:eventId', updateEventById); // Update event by ID
router.delete('/:eventId', deleteEventById); // Delete event by ID

module.exports = router;
