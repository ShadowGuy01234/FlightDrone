import express from "express";
import { createOrder, verifyPayment } from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/order", requireSignIn, createOrder);
router.post("/verify", requireSignIn, verifyPayment);


export default router;
