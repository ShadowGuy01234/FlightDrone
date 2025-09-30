import express from "express";
import { 
  createOrder, 
  verifyPayment, 
  getUserOrders, 
  getAllOrders, 
  updateOrderStatus 
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = express.Router();

// Payment routes
router.post("/create-order", requireSignIn, createOrder);
router.post("/verify-payment", requireSignIn, verifyPayment);

// Order management routes
router.get("/user-orders", requireSignIn, getUserOrders);
router.get("/all-orders", requireSignIn, isAdmin, getAllOrders);
router.put("/update-status/:orderId", requireSignIn, isAdmin, updateOrderStatus);

// Legacy routes for backward compatibility
router.post("/order", requireSignIn, createOrder);
router.post("/verify", requireSignIn, verifyPayment);

export default router;
