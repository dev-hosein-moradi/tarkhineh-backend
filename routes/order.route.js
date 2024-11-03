import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addOrderHandler,
  deleteOrderHandler,
  getOrderHandler,
  getOrdersHandler,
  updateOrderHandler,
} from "../controllers/order.controller.js";
// import { verifyCache } from "../helpers/cache.js";

const foodRouter = Router();
// public route
foodRouter.get("/api/foods", getOrdersHandler);
foodRouter.get("/api/food/:id", getOrderHandler);

// protected route
foodRouter.post("/admin/food", authenticateToken, addOrderHandler);
foodRouter.patch("/admin/food", authenticateToken, updateOrderHandler);
foodRouter.delete("/admin/food", authenticateToken, deleteOrderHandler);

export default (app) => {
  app.use("/", foodRouter);
};
