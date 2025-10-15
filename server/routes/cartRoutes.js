import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartSummary
} from '../controllers/cartController.js';
import { requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes require authentication
router.use(requireSignIn);

// Get user cart
router.get('/get-cart', getCart);

// Add item to cart
router.post('/add-to-cart', addToCart);

// Update cart item quantity
router.put('/update-cart', updateCartItem);

// Remove item from cart
router.delete('/remove-from-cart/:productId', removeFromCart);

// Clear cart
router.delete('/clear-cart', clearCart);

// Get cart summary
router.get('/cart-summary', getCartSummary);

export default router;