import express from 'express';
import { createAdController, updateAdController, getAllAdsController, deleteAdController } from '../controllers/adCardController.js';
import { requireSignIn, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/create-ad', requireSignIn, isAdmin, createAdController);
router.get('/get-ads', getAllAdsController);
router.put('/update-ad/:id', requireSignIn, isAdmin, updateAdController);
router.delete('/delete-ad/:id', requireSignIn, isAdmin, deleteAdController);

export default router;
