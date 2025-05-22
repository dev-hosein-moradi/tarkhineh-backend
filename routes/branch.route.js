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
import { verifyCache } from "../helpers/cache.js";

const BranchRouter = Router();

// Public routes (with caching)
BranchRouter.get("/branches", verifyCache, getBranchsHandler); // Plural
BranchRouter.get("/branches/:id", verifyCache, getBranchHandler); // Consistent naming

// Protected admin routes
BranchRouter.post(
  "/admin/branches",
  authenticateToken,
  requireAdmin, // Additional admin check middleware
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

// Version 1: Export as middleware
export default (app) => {
  app.use("/api/v1", BranchRouter); // Added versioning
};

// Version 2: Alternative direct export
// export default BranchRouter;
