import { Router } from "express";
import {
  loginUserHandler,
  registerUserHandler,
  logoutUserHandler
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUserHandler);
authRouter.post("/login", loginUserHandler);
authRouter.post("/logout", logoutUserHandler);

export default (app) => {
  app.use("/", authRouter);
};
