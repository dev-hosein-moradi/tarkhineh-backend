import { Router } from "express";
import {
  loginUserHandler,
  registerUserHandler,
  logoutUserHandler,
  refreshTokenHandler,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "../middleware/auth.validation.js";

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
// authRouter.get("/verify", authenticate, verifyTokenHandler);

export default authRouter;
