// routes/orderRoutes.js
const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { isAdmin } = require('../middleware/authMiddleware'); // Middleware for admin access
const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders (Admin only)
router.get('/', isAdmin, getOrders);

module.exports = router;
