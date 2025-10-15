import express from "express";
import {
  generateSitemap,
  getPageMetadata,
  updateMetadata,
} from "../controllers/seoController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/sitemap", generateSitemap);
router.get("/metadata/:page", getPageMetadata);

// Protected route (admin only)
router.put("/metadata/update", requireSignIn, isAdmin, updateMetadata);

export default router;
