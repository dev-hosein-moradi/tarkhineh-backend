import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addBranchsHandler,
  deleteBranchsHandler,
  getBranchHandler,
  getBranchsHandler,
  updateBranchsHandler,
} from "../controllers/branch.controller.js";
import { verifyCache } from "../helpers/cache.js";

const BranchRouter = Router();
// public route
BranchRouter.get("/api/branchs", verifyCache, getBranchsHandler);
BranchRouter.get("/api/branch/:id", verifyCache, getBranchHandler);

// protected route
BranchRouter.post("/admin/branch", authenticateToken, addBranchsHandler);
BranchRouter.patch("/admin/branch", authenticateToken, updateBranchsHandler);
BranchRouter.delete("/admin/branch", authenticateToken, deleteBranchsHandler);

export default (app) => {
  app.use("/", BranchRouter);
};
