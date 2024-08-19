import { Router } from "express";
import {
  loginUserHandler,
  registerUserHandler,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUserHandler);
authRouter.post("/login", loginUserHandler);

export default (app) => {
  app.use("/", authRouter);
};
