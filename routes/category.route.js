import { Router } from "express";
import { verifyCache } from "../helpers/cache.js";
import {
  addCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "../controllers/category.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const categoryRouter = Router();

// Public routes
categoryRouter.get("/categories", verifyCache, getCategoriesHandler);
categoryRouter.get("/categories/:id", verifyCache, getCategoryHandler);

// Admin protected routes
categoryRouter.post(
  "/admin/categories",
  addCategoryHandler
);
categoryRouter.patch(
  "/admin/categories/:id",
  authenticateToken,
  requireAdmin,
  updateCategoryHandler
);
categoryRouter.delete(
  "/admin/categories/:id",
  authenticateToken,
  requireAdmin,
  deleteCategoryHandler
);

export default categoryRouter;
