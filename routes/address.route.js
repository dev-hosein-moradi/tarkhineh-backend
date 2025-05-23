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

const AdressRouter = Router();
// public route
AdressRouter.get(
  "/api/addresses",
  authenticateToken,
  getAddressesByUserHandler
);
AdressRouter.get("/address/:id", authenticateToken, getAddressHandler);
AdressRouter.post("/address", authenticateToken, addAddressHandler);
AdressRouter.patch("/address", authenticateToken, updateAddressHandler);
AdressRouter.delete("/address/:id", authenticateToken, deleteAddressHandler);

// for admin
AdressRouter.get(
  "/admin/addresses",
  authenticateToken,
  requireAdmin,
  getAddressesHandler
);

export default AdressRouter;
