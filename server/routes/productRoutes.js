// routes/productRoutes.js
const express = require('express');
const { getProducts, createProduct, getProductById, addReview, editReview, deleteReview } = require('../controllers/productController');
const { isAdmin, protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all products
router.get('/', getProducts);

// Route to create a new product (Admin only)
router.post('/', createProduct);

// Route to get a single product by ID
router.get('/:id', getProductById);

// Route to add a review to a product
router.post('/:productId/reviews', protect, addReview);

// Route to edit a review
router.put('/:productId/reviews', protect, editReview);

// Route to delete a review
router.delete('/:productId/reviews/:userId', protect, deleteReview);

module.exports = router;
