import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addOrderHandler,
  deleteOrderHandler,
  getOrderHandler,
  getOrdersByUserHandler,
  getOrdersHandler,
  updateOrderHandler,
} from "../controllers/order.controller.js";
// import { verifyCache } from "../helpers/cache.js";

const foodRouter = Router();
// public route
foodRouter.get("/api/orders", getOrdersByUserHandler);
foodRouter.get("/api/order/:id", getOrderHandler);
foodRouter.post("/api/order", addOrderHandler);

// protected route
foodRouter.post("/admin/order", authenticateToken, addOrderHandler);
foodRouter.patch("/admin/order", authenticateToken, updateOrderHandler);
foodRouter.delete("/admin/order/:id", authenticateToken, deleteOrderHandler);

// for admin
foodRouter.get("/admin/orders", getOrdersHandler);

export default (app) => {
  app.use("/", foodRouter);
};
