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
foodRouter.get("/api/foods", getAddressesHandler);
foodRouter.get("/api/food/:id", getAddressHandler);

// protected route
foodRouter.post("/admin/food", authenticateToken, addAddressHandler);
foodRouter.patch("/admin/food", authenticateToken, updateAddressHandler);
foodRouter.delete("/admin/food", authenticateToken, deleteAddressHandler);

export default (app) => {
  app.use("/", foodRouter);
};
