import { Router } from "express";
import { getDateTime } from "../controllers/date.controller.js";
// import { verifyCache } from "../helpers/cache.js";

const dateRouter = Router();
// public route
dateRouter.get("/api/date", getDateTime);

export default (app) => {
  app.use("/", dateRouter);
};
