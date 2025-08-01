import { Router } from "express";

import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
  updateUserStatusHandler, // Add this new handler
  getUserPermissionsHandler,
  assignUserPermissionsHandler,
  replaceUserPermissionsHandler,
  removeUserPermissionsHandler,
  assignUserRoleHandler,
  getUsersWithRolesHandler,
} from "../controllers/users.controller.js";
import {
  authenticateToken,
  requireAdmin,
} from "../middleware/auth.middleware.js";
import { requireSuperAdmin } from "../middleware/permission.middleware.js";

const userRouter = Router();

// Admin routes for user management
userRouter.get(
  "/admin/users",
  authenticateToken,
  requireAdmin,
  getUsersHandler
);

userRouter.get(
  "/admin/users-with-roles",
  authenticateToken,
  requireAdmin,
  getUsersWithRolesHandler
);

userRouter.get(
  "/admin/users/:id",
  authenticateToken,
  requireAdmin,
  getUserHandler
);

userRouter.post(
  "/admin/users",
  authenticateToken,
  requireSuperAdmin,
  addUserHandler
);

userRouter.patch(
  "/admin/users/:id",
  authenticateToken,
  requireAdmin,
  updateUserHandler
);

// Add the status toggle endpoint
userRouter.patch(
  "/admin/users/:userId/status",
  authenticateToken,
  requireAdmin,
  updateUserStatusHandler
);

userRouter.delete(
  "/admin/users/:id",
  authenticateToken,
  requireSuperAdmin,
  deleteUserHandler
);

// Permission management routes
userRouter.get(
  "/admin/users/:id/permissions",
  authenticateToken,
  requireSuperAdmin,
  getUserPermissionsHandler
);

userRouter.post(
  "/admin/users/:id/permissions",
  authenticateToken,
  requireSuperAdmin,
  assignUserPermissionsHandler
);

userRouter.put(
  "/admin/users/:id/permissions",
  authenticateToken,
  requireSuperAdmin,
  replaceUserPermissionsHandler
);

userRouter.delete(
  "/admin/users/:id/permissions",
  authenticateToken,
  requireSuperAdmin,
  removeUserPermissionsHandler
);

userRouter.patch(
  "/admin/users/:id/role",
  authenticateToken,
  requireSuperAdmin,
  assignUserRoleHandler
);

export default userRouter;
