import express from "express";
import {
  createJobController,
  getJobsController,
  getSingleJobController,
  updateJobController,
  deleteJobController,
  createJobApplicationController,
  getJobApplicationsController,
  updateJobApplicationStatusController,
  deleteJobApplicationController,
} from "../controllers/jobController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Job routes (Admin only)
router.post("/create", requireSignIn, isAdmin, createJobController);
router.get("/get-jobs", getJobsController);
router.get("/get-job/:id", getSingleJobController);
router.put("/update-job/:id", requireSignIn, isAdmin, updateJobController);
router.delete("/delete-job/:id", requireSignIn, isAdmin, deleteJobController);

// Job application routes
router.post("/apply", createJobApplicationController);
router.get(
  "/applications",
  requireSignIn,
  isAdmin,
  getJobApplicationsController
);
router.put(
  "/applications/:id/status",
  requireSignIn,
  isAdmin,
  updateJobApplicationStatusController
);
router.delete(
  "/applications/:id",
  requireSignIn,
  isAdmin,
  deleteJobApplicationController
);

export default router;
