// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser, updateProfileController, forgotPasswordController, getAllOrdersController, orderStatusController, getOrdersController } from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);
router.post('/forgot-password', requireSignIn, forgotPasswordController);
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});
router.put('/update-profile', requireSignIn, updateProfileController);
router.get("/getorders", requireSignIn, getOrdersController);
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);


export default router;
