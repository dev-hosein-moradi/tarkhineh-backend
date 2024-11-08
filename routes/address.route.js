import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addAddressHandler,
  deleteAddressHandler,
  getAddressesByUserHandler,
  getAddressesHandler,
  getAddressHandler,
  updateAddressHandler,
} from "../controllers/address.controller.js";
// import { verifyCache } from "../helpers/cache.js";

const foodRouter = Router();
// public route
foodRouter.get("/api/addresses", getAddressesByUserHandler);
foodRouter.get("/api/address/:id", getAddressHandler);
foodRouter.post("/api/address", authenticateToken, addAddressHandler);
foodRouter.patch("/api/address", authenticateToken, updateAddressHandler);
foodRouter.delete("/api/address/:id", authenticateToken, deleteAddressHandler);

// for admin
foodRouter.get("/admin/addresses", getAddressesHandler);

export default (app) => {
  app.use("/", foodRouter);
};
