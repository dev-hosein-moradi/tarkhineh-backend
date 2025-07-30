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

// Protected admin routes
BranchRouter.post(
  "/admin/branches",
  authenticateToken,
  requirePermission("MANAGE_BRANCHES"),
  addBranchsHandler
);

// Branch manager can update their own branch
BranchRouter.patch(
  "/admin/branches/:id",
  authenticateToken,
  requireBranchAccess,
  requirePermission("MANAGE_OWN_BRANCH", true),
  updateBranchsHandler
);

BranchRouter.delete(
  "/admin/branches/:id",
  authenticateToken,
  requireAdmin,
  deleteBranchsHandler
);

export default BranchRouter;
