const express = require('express');
const { addItemToCart, removeItemFromCart, getCart, clearCart } = require('../controllers/cart');

const router = express.Router();

router.post('/add', addItemToCart);
router.post('/remove', removeItemFromCart);
router.get('/:userId/:guestToken?', getCart);
router.post('/clear', clearCart);

module.exports = router;
