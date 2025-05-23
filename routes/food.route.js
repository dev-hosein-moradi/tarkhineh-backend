import { Router } from "express";

import {
  addFoodHandler,
  deleteFoodHandler,
  getFoodHandler,
  getFoodsHandler,
  updateFoodHandler,
} from "../controllers/foods.controller.js";
import { verifyCache } from "../helpers/cache.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const foodRouter = Router();

// Public routes
foodRouter.get("/foods", verifyCache, getFoodsHandler);
foodRouter.get("/foods/:id", verifyCache, getFoodHandler);

// Admin protected routes
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

export default foodRouter;
