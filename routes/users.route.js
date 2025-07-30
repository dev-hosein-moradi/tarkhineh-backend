import { Router } from "express";

import {
  addUserHandler,
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  updateUserHandler,
  // Add new permission handlers
  getUserPermissionsHandler,
  assignUserPermissionsHandler,
  replaceUserPermissionsHandler, // New handler for PUT
  removeUserPermissionsHandler, // New handler for DELETE
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
  requireSuperAdmin,
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

// POST - Add permissions (keeps existing ones)
userRouter.post(
  "/admin/users/:id/permissions",
  authenticateToken,
  requireSuperAdmin,
  assignUserPermissionsHandler
);

// PUT - Replace all permissions (full replacement)
userRouter.put(
  "/admin/users/:id/permissions",
  authenticateToken,
  requireSuperAdmin,
  replaceUserPermissionsHandler
);

// DELETE - Remove all permissions or specific ones
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
