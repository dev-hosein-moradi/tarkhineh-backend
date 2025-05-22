import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../middlewares/auth.middleware.js";
import {
  addFoodHandler,
  deleteFoodHandler,
  getFoodHandler,
  getFoodsHandler,
  updateFoodHandler,
} from "../controllers/food.controller.js";
import { verifyCache } from "../helpers/cache.js";

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
