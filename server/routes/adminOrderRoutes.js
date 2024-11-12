// routes/adminOrderRoutes.js
const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../controllers/adminOrderController');
const { isAdmin, protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all orders (Admin only)
router.get('/', protect, isAdmin, getAllOrders);

// Update order status (Admin only)
router.put('/:id', protect, isAdmin, updateOrderStatus);

module.exports = router;
