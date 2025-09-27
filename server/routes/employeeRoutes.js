import express from "express";
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  toggleEmployeeStatus,
} from "../controllers/employeeController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/get-employees", getEmployees);
router.get("/get-employee/:id", getEmployeeById);

// Admin only routes
router.post("/create-employee", requireSignIn, isAdmin, createEmployee);
router.put("/update-employee/:id", requireSignIn, isAdmin, updateEmployee);
router.delete("/delete-employee/:id", requireSignIn, isAdmin, deleteEmployee);
router.patch(
  "/toggle-status/:id",
  requireSignIn,
  isAdmin,
  toggleEmployeeStatus
);

export default router;
