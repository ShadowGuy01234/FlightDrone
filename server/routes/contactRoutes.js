import express from "express";
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
} from "../controllers/contactController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - Submit contact form
router.post("/submit", submitContactForm);

// Admin routes - Protected
router.get("/all", requireSignIn, isAdmin, getAllContacts);
router.get("/stats", requireSignIn, isAdmin, getContactStats);
router.get("/:id", requireSignIn, isAdmin, getContactById);
router.put("/:id/status", requireSignIn, isAdmin, updateContactStatus);
router.delete("/:id", requireSignIn, isAdmin, deleteContact);

export default router;
