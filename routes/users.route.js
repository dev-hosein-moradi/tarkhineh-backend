import { Router } from "express";

import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../controllers/users.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";

const userRouter = Router();

// Admin routes
userRouter.get("/users", authenticateToken, requireAdmin, getUsersHandler);
userRouter.get("/users/:id", authenticateToken, requireAdmin, getUserHandler);
userRouter.post("/users", authenticateToken, requireAdmin, addUserHandler);
userRouter.patch(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  updateUserHandler
);
userRouter.delete(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  deleteUserHandler
);

export default userRouter;
