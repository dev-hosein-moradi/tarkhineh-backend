import { Router } from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../controllers/users.controller.js";

const userRouter = Router();

// protected route
userRouter.get("/admin/users", authenticateToken, getUsersHandler);
userRouter.get("/admin/user/:id", authenticateToken, getUserHandler);
userRouter.post("/admin/user", authenticateToken, addUserHandler);
userRouter.patch("/admin/user", authenticateToken, updateUserHandler);
userRouter.delete("/admin/user", authenticateToken, deleteUserHandler);

export default (app) => {
  app.use("/", userRouter);
};
