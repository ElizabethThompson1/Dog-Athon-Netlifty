const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createGear, getAllGears, getGearById, updateGearById, deleteGearById } = require('../controllers/gear');

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post('/create', upload.single('image'), createGear); // Create a new gear with image upload
router.get('/', getAllGears);
router.get('/:gearId', getGearById); // Get gear by ID
router.put('/:gearId', updateGearById); // Update gear by ID
router.delete('/:gearId', deleteGearById); // Delete gear by ID

module.exports = router;
