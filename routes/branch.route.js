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

const BranchRouter = Router();

// Public routes (with caching)
BranchRouter.get("/branches", getBranchsHandler);
BranchRouter.get("/branches/:id", getBranchHandler);

// Protected admin routes
BranchRouter.post(
  "/admin/branches",
  authenticateToken,
  requireAdmin,
  addBranchsHandler
);

BranchRouter.patch(
  "/admin/branches/:id",
  authenticateToken,
  requireAdmin,
  updateBranchsHandler
);

BranchRouter.delete(
  "/admin/branches/:id",
  authenticateToken,
  requireAdmin,
  deleteBranchsHandler
);

export default BranchRouter;
