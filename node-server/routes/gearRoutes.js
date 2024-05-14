const express = require('express');
const router = express.Router();
const { getGearById, addGearToCart, createGear, deleteGearById,getAllGear } = require('../controllers/gear');

router.get('/:gearId', getGearById); // Get gear by ID
router.post('/:gearId/cart', addGearToCart); // Add gear to cart
router.post('/', createGear); // Create a new gear item
router.delete('/:gearId', deleteGearById); // Delete gear by ID
router.get('/', getAllGear); // Get all gear items

module.exports = router;
