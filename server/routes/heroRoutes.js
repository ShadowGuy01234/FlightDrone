import express from "express";
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import {
    createHero,
    getAllHeros,
    updateHero,
    deleteHero,
} from "../controllers/heroController.js";

const router = express.Router();

// Public routes
router.get("/", getAllHeros);

// Admin routes
router.post("/", requireSignIn, isAdmin, createHero);
router.put("/:id", requireSignIn, isAdmin, updateHero);
router.delete("/:id", requireSignIn, isAdmin, deleteHero);

export default router; 