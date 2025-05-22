import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../middlewares/auth.middleware.js";
import {
  addCartHandler,
  deleteCartHandler,
  getCartHandler,
  getCartsHandler,
  updateCartHandler,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

// Customer routes
cartRouter.get(
  "/carts/customer/:customerId",
  authenticateToken,
  getCartsHandler
);
cartRouter.get("/carts/:id", authenticateToken, getCartHandler);
cartRouter.post("/carts", authenticateToken, addCartHandler);

// Admin routes
cartRouter.patch(
  "/admin/carts/:id/status",
  authenticateToken,
  requireAdmin,
  updateCartHandler
);
cartRouter.delete(
  "/admin/carts/:id",
  authenticateToken,
  requireAdmin,
  deleteCartHandler
);

export default cartRouter;
