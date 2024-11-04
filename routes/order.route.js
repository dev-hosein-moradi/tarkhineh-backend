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
foodRouter.get("/api/orders", getOrdersHandler);
foodRouter.get("/api/order/:id", getOrderHandler);

// protected route
foodRouter.post("/admin/order", authenticateToken, addOrderHandler);
foodRouter.patch("/admin/order", authenticateToken, updateOrderHandler);
foodRouter.delete("/admin/order", authenticateToken, deleteOrderHandler);

export default (app) => {
  app.use("/", foodRouter);
};
