import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import {
  addBranchsHandler,
  deleteBranchsHandler,
  getBranchHandler,
  getBranchsHandler,
  updateBranchsHandler,
  toggleBranchVerificationHandler, // Add new handler
} from "../controllers/branch.controller.js";
import {
  requirePermission,
  requireSuperAdmin,
  requireBranchAccess,
} from "../middleware/permission.middleware.js";

const BranchRouter = Router();

// Public routes (with caching)
BranchRouter.get("/branches", getBranchsHandler);
BranchRouter.get("/branches/:id", getBranchHandler);

// Protected admin routes with pagination and search support
BranchRouter.get(
  "/admin/branches",
  authenticateToken,
  requireAdmin, // Admin and SuperAdmin can view all branches
  getBranchsHandler // This will handle pagination and search
);

BranchRouter.get(
  "/admin/branches/:id",
  authenticateToken,
  requireAdmin,
  getBranchHandler
);

// Create branch (SuperAdmin only)
BranchRouter.post(
  "/admin/branches",
  authenticateToken,
  requireSuperAdmin, // Only SuperAdmin can create
  addBranchsHandler
);

// Update branch (SuperAdmin and Admin can edit)
BranchRouter.patch(
  "/admin/branches/:id",
  authenticateToken,
  requireAdmin, // Both Admin and SuperAdmin can update
  updateBranchsHandler
);

// Toggle verification status (SuperAdmin and Admin)
BranchRouter.patch(
  "/admin/branches/:id/verification",
  authenticateToken,
  requireAdmin,
  toggleBranchVerificationHandler
);

// Delete branch (SuperAdmin only)
BranchRouter.delete(
  "/admin/branches/:id",
  authenticateToken,
  requireSuperAdmin, // Only SuperAdmin can delete
  deleteBranchsHandler
);

export default BranchRouter;
