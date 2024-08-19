import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import { verifyCache } from "../helpers/cache.js";
import {
  addCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "../controllers/category.controller.js";

const CategoryRouter = Router();
// public route
CategoryRouter.get("/api/categories", verifyCache, getCategoriesHandler);
CategoryRouter.get("/api/category/:id", verifyCache, getCategoryHandler);

// protected route
CategoryRouter.post("/admin/category", authenticateToken, addCategoryHandler);
CategoryRouter.patch(
  "/admin/category",
  authenticateToken,
  updateCategoryHandler
);
CategoryRouter.delete(
  "/admin/category",
  authenticateToken,
  deleteCategoryHandler
);

export default (app) => {
  app.use("/", CategoryRouter);
};
