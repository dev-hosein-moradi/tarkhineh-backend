import { Router } from "express";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import {
  addAddressHandler,
  deleteAddressHandler,
  getAddressesByUserHandler,
  getAddressesHandler,
  getAddressHandler,
  updateAddressHandler,
} from "../controllers/address.controller.js";

const foodRouter = Router();
// public route
foodRouter.get("/api/addresses", authenticateToken, getAddressesByUserHandler);
foodRouter.get("/api/address/:id", authenticateToken, getAddressHandler);
foodRouter.post("/api/address", authenticateToken, addAddressHandler);
foodRouter.patch("/api/address", authenticateToken, updateAddressHandler);
foodRouter.delete("/api/address/:id", authenticateToken, deleteAddressHandler);

// for admin
foodRouter.get(
  "/admin/addresses",
  authenticateToken,
  requireAdmin,
  getAddressesHandler
);

export default (app) => {
  app.use("/", foodRouter);
};
