// routes/cartRoutes.js
const express = require('express');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get user cart
router.get('/', protect, getCart);

// Add item to cart
router.post('/', protect, addToCart);

// Remove item from cart
router.delete('/:productId', protect, removeFromCart);

module.exports = router;
