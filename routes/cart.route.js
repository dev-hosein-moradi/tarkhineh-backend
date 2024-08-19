import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addCartHandler,
  deleteCartHandler,
  getCartHandler,
  getCartsHandler,
  updateCartHandler,
} from "../controllers/cart.controller.js";
import { verifyCache } from "../helpers/cache.js";

const CartRouter = Router();
// public route
CartRouter.get("/api/carts", verifyCache, getCartsHandler);
CartRouter.get("/api/cart/:id", verifyCache, getCartHandler);

// protected route
CartRouter.post("/admin/cart", authenticateToken, addCartHandler);
CartRouter.patch("/admin/cart", authenticateToken, updateCartHandler);
CartRouter.delete("/admin/cart", authenticateToken, deleteCartHandler);

export default (app) => {
  app.use("/", CartRouter);
};
