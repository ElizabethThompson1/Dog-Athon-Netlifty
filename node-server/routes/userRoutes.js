const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, deleteUser, getUserByEmail } = require('../controllers/user');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);
router.delete('/:userId', deleteUser);
router.get('/email/:email', getUserByEmail);

module.exports = router;
