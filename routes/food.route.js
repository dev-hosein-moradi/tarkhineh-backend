import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addFoodHandler,
  deleteFoodHandler,
  getFoodHandler,
  getFoodsHandler,
  updateFoodHandler,
} from "../controllers/foods.controller.js";
import { verifyCache } from "../helpers/cache.js";

const foodRouter = Router();
// public route
foodRouter.get("/api/foods", verifyCache, getFoodsHandler);
foodRouter.get("/api/food/:id", verifyCache, getFoodHandler);

// protected route
foodRouter.post("/admin/food", authenticateToken, addFoodHandler);
foodRouter.patch("/admin/food", authenticateToken, updateFoodHandler);
foodRouter.delete("/admin/food", authenticateToken, deleteFoodHandler);

export default (app) => {
  app.use("/", foodRouter);
};
