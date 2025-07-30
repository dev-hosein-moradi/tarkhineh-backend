import prisma from "../utils/prisma.js";

// Check if user has specific permission
export const requirePermission = (permission, branchSpecific = false) => {
  return async (req, res, next) => {
    try {
      const userId = req.authData?.id;
      if (!userId) {
        return res.status(401).json({
          ok: false,
          message: "User not authenticated",
          error: "unauthorized",
          data: null,
        });
      }

      // Get user with permissions
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          permissions: {
            include: {
              branch: true,
            },
          },
          branch: true,
        },
      });

      if (!user || !user.isActive) {
        return res.status(403).json({
          ok: false,
          message: "User not found or inactive",
          error: "forbidden",
          data: null,
        });
      }

      // Super admin has all permissions
      if (user.role === "superAdmin") {
        req.userRole = user.role;
        req.userBranch = user.branch;
        return next();
      }

      // Check if user has the required permission
      const hasPermission = user.permissions.some((perm) => {
        if (perm.permission === permission) {
          // If branch-specific permission is required
          if (branchSpecific) {
            const branchId =
              req.params.branchId || req.body.branchId || user.branchId;
            return !perm.branchId || perm.branchId === branchId;
          }
          return true;
        }
        return false;
      });

      if (!hasPermission) {
        return res.status(403).json({
          ok: false,
          message: "شما مجوز لازم برای انجام این عملیات را ندارید",
          error: "insufficient_permissions",
          data: null,
        });
      }

      req.userRole = user.role;
      req.userBranch = user.branch;
      req.userPermissions = user.permissions;
      next();
    } catch (error) {
      console.error("[PERMISSION_CHECK_ERROR]:", error);
      return res.status(500).json({
        ok: false,
        message: "خطای سرور در بررسی مجوزها",
        error: "server_error",
        data: null,
      });
    }
  };
};

// Check if user is admin (any level)
export const requireAdmin = async (req, res, next) => {
  try {
    const userRole = req.authData?.role || req.authData?.type;

    if (!["admin", "superAdmin"].includes(userRole)) {
      return res.status(403).json({
        ok: false,
        message: "دسترسی فقط برای مدیران مجاز است",
        error: "admin_required",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.error("[ADMIN_CHECK_ERROR]:", error);
    return res.status(500).json({
      ok: false,
      message: "خطای سرور در بررسی دسترسی مدیر",
      error: "server_error",
      data: null,
    });
  }
};

// Check if user is super admin
export const requireSuperAdmin = async (req, res, next) => {
  try {
    const userRole = req.authData?.role || req.authData?.type;

    if (userRole !== "superAdmin") {
      return res.status(403).json({
        ok: false,
        message: "دسترسی فقط برای مدیر کل سیستم مجاز است",
        error: "super_admin_required",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.error("[SUPER_ADMIN_CHECK_ERROR]:", error);
    return res.status(500).json({
      ok: false,
      message: "خطای سرور در بررسی دسترسی مدیر کل",
      error: "server_error",
      data: null,
    });
  }
};

// Check if user can manage specific branch
export const requireBranchAccess = async (req, res, next) => {
  try {
    const userId = req.authData?.id;
    const branchId = req.params.branchId || req.body.branchId;

    if (!branchId) {
      return res.status(400).json({
        ok: false,
        message: "شناسه شعبه مورد نیاز است",
        error: "branch_id_required",
        data: null,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        permissions: {
          where: { branchId },
        },
        branch: true,
      },
    });

    // Super admin has access to all branches
    if (user.role === "superAdmin") {
      return next();
    }

    // Check if user is manager of this branch or has permissions for it
    const hasAccess =
      user.branchId === branchId ||
      user.permissions.some((p) => p.branchId === branchId);

    if (!hasAccess) {
      return res.status(403).json({
        ok: false,
        message: "شما دسترسی به این شعبه را ندارید",
        error: "branch_access_denied",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.error("[BRANCH_ACCESS_CHECK_ERROR]:", error);
    return res.status(500).json({
      ok: false,
      message: "خطای سرور در بررسی دسترسی شعبه",
      error: "server_error",
      data: null,
    });
  }
};
