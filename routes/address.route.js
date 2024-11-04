import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addAddressHandler,
  deleteAddressHandler,
  getAddressesHandler,
  getAddressHandler,
  updateAddressHandler,
} from "../controllers/address.controller.js";
// import { verifyCache } from "../helpers/cache.js";

const foodRouter = Router();
// public route
foodRouter.get("/api/addresses", getAddressesHandler);
foodRouter.get("/api/address/:id", getAddressHandler);
foodRouter.post("/api/address", authenticateToken, addAddressHandler);
foodRouter.patch("/api/address", authenticateToken, updateAddressHandler);
foodRouter.delete("/api/address", authenticateToken, deleteAddressHandler);

export default (app) => {
  app.use("/", foodRouter);
};
