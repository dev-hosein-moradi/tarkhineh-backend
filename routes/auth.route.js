import { Router } from "express";
import {
  loginUserHandler,
  registerUserHandler,
  logoutUserHandler,
  refreshTokenHandler,
  verifyTokenHandler, // Add this import
} from "../controllers/auth.controller.js";

import { authenticateToken } from "../middleware/auth.middleware.js";
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
authRouter.post("/logout", authenticateToken, logoutUserHandler);
authRouter.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  refreshTokenHandler
);

// Token verification endpoint - NO AUTO REFRESH
authRouter.get("/verify", verifyTokenHandler);

export default authRouter;
