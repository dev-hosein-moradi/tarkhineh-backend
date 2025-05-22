import { Router } from "express";
import {
  loginUserHandler,
  registerUserHandler,
  logoutUserHandler,
  refreshTokenHandler,
  verifyTokenHandler,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../validations/auth.validation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();

// Public routes
authRouter.post("/register", validate(registerSchema), registerUserHandler);
authRouter.post("/login", validate(loginSchema), loginUserHandler);

// Protected routes
authRouter.post("/logout", authenticate, logoutUserHandler);
authRouter.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  refreshTokenHandler
);
authRouter.get("/verify", authenticate, verifyTokenHandler);

export default authRouter;
