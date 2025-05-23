import { Router } from "express";

import {
  addCartHandler,
  deleteCartHandler,
  getCartHandler,
  getCartsHandler,
  updateCartHandler,
} from "../controllers/cart.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

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
