import { Router } from "express";
import {
  addOrderHandler,
  deleteOrderHandler,
  getOrderHandler,
  getOrdersByUserHandler,
  getOrdersHandler,
  updateOrderHandler,
} from "../controllers/order.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const orderRouter = Router();

// Client routes
orderRouter.get("/orders/user/:userId", getOrdersByUserHandler);
orderRouter.get("/orders/:orderId", getOrderHandler);
orderRouter.post("/orders", addOrderHandler);

// Admin routes
orderRouter.get(
  "/admin/orders",
  authenticateToken,
  requireAdmin,
  getOrdersHandler
);
orderRouter.patch(
  "/admin/orders/:orderId/status",
  authenticateToken,
  requireAdmin,
  updateOrderHandler
);
orderRouter.delete(
  "/admin/orders/:orderId",
  authenticateToken,
  requireAdmin,
  deleteOrderHandler
);

export default orderRouter;
