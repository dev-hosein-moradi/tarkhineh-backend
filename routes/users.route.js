import { Router } from "express";
import { authenticateToken, requireAdmin } from "../middlewares/auth.middleware.js";
import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../controllers/users.controller.js";

const userRouter = Router();

// Admin routes
userRouter.get("/users", authenticateToken, requireAdmin, getUsersHandler);
userRouter.get("/users/:id", authenticateToken, requireAdmin, getUserHandler);
userRouter.post("/users", authenticateToken, requireAdmin, addUserHandler);
userRouter.patch("/users/:id", authenticateToken, requireAdmin, updateUserHandler);
userRouter.delete("/users/:id", authenticateToken, requireAdmin, deleteUserHandler);

export default userRouter;