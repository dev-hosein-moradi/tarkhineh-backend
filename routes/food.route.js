import { Router } from "express";

import {
  addFoodHandler,
  deleteFoodHandler,
  getFoodHandler,
  getFoodsHandler,
  updateFoodHandler,
  // Add accompaniment handlers
  getAccompanimentsHandler,
  getAccompanimentHandler,
  addAccompanimentHandler,
  updateAccompanimentHandler,
  deleteAccompanimentHandler,
  // Add category handlers
  getAccompanimentCategoriesHandler,
  getAccompanimentCategoryHandler,
  addAccompanimentCategoryHandler,
  updateAccompanimentCategoryHandler,
  deleteAccompanimentCategoryHandler,
} from "../controllers/foods.controller.js";
import { verifyCache } from "../helpers/cache.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const foodRouter = Router();

// Public routes - Foods
foodRouter.get("/foods", verifyCache, getFoodsHandler);
foodRouter.get("/foods/:id", verifyCache, getFoodHandler);

// Public routes - Accompaniments
foodRouter.get("/accompaniments", verifyCache, getAccompanimentsHandler);
foodRouter.get("/accompaniments/:id", verifyCache, getAccompanimentHandler);

// Public routes - Accompaniment Categories
foodRouter.get(
  "/accompaniment-categories",
  verifyCache,
  getAccompanimentCategoriesHandler
);
foodRouter.get(
  "/accompaniment-categories/:id",
  verifyCache,
  getAccompanimentCategoryHandler
);

// Admin protected routes - Foods
foodRouter.post(
  "/admin/foods",
  authenticateToken,
  requireAdmin,
  addFoodHandler
);
foodRouter.patch(
  "/admin/foods/:id",
  authenticateToken,
  requireAdmin,
  updateFoodHandler
);
foodRouter.delete(
  "/admin/foods/:id",
  authenticateToken,
  requireAdmin,
  deleteFoodHandler
);

// Admin protected routes - Accompaniments
foodRouter.post(
  "/admin/accompaniments",
  authenticateToken,
  requireAdmin,
  addAccompanimentHandler
);
foodRouter.patch(
  "/admin/accompaniments/:id",
  authenticateToken,
  requireAdmin,
  updateAccompanimentHandler
);
foodRouter.delete(
  "/admin/accompaniments/:id",
  authenticateToken,
  requireAdmin,
  deleteAccompanimentHandler
);

// Admin protected routes - Accompaniment Categories
foodRouter.post(
  "/admin/accompaniment-categories",
  authenticateToken,
  requireAdmin,
  addAccompanimentCategoryHandler
);
foodRouter.patch(
  "/admin/accompaniment-categories/:id",
  authenticateToken,
  requireAdmin,
  updateAccompanimentCategoryHandler
);
foodRouter.delete(
  "/admin/accompaniment-categories/:id",
  authenticateToken,
  requireAdmin,
  deleteAccompanimentCategoryHandler
);

export default foodRouter;
