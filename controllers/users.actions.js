import prisma from "../utils/prisma.js";
import { generatePasswordHash } from "../helpers/hash.js";

export const GET = async (filters = {}) => {
  try {
    // Extract pagination parameters
    const page = Math.max(1, parseInt(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(filters.limit) || 10));
    const offset = (page - 1) * limit;

    // Extract sorting parameters
    const sortField = filters.sort || "createdAt";
    const sortOrder =
      (filters.order || "desc").toLowerCase() === "asc" ? "asc" : "desc";

    // Validate sort field
    const allowedSortFields = [
      "createdAt",
      "firstName",
      "lastName",
      "email",
      "role",
      "type",
    ];
    const orderBy = allowedSortFields.includes(sortField)
      ? { [sortField]: sortOrder }
      : { createdAt: "desc" };

    // Build dynamic where clause based on filters
    const whereClause = {};
    const searchConditions = [];

    // Filter by type (admin, user)
    if (filters.type) {
      whereClause.type = filters.type;
    }

    // Filter by role (customer, admin, superAdmin, etc.)
    if (filters.role) {
      whereClause.role = filters.role;
    }

    // Exclude specific role
    if (filters.excludeRole) {
      whereClause.role = {
        not: filters.excludeRole,
      };
    }

    // Combine type and excludeRole filters
    if (filters.type && filters.excludeRole) {
      whereClause.AND = [
        { type: filters.type },
        { role: { not: filters.excludeRole } },
      ];
      // Remove individual filters to avoid conflict
      delete whereClause.type;
      delete whereClause.role;
    }

    // Search functionality
    if (filters.search) {
      const searchTerm = filters.search.trim();
      if (searchTerm) {
        searchConditions.push(
          { firstName: { contains: searchTerm, mode: "insensitive" } },
          { lastName: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { mobileNumber: { contains: searchTerm } }
        );

        // Add search conditions to where clause
        if (whereClause.AND) {
          whereClause.AND.push({ OR: searchConditions });
        } else {
          whereClause.OR = searchConditions;
        }
      }
    }

    console.log("[WHERE_CLAUSE]:", JSON.stringify(whereClause, null, 2));

    // Get total count for pagination
    const total = await prisma.user.count({
      where: whereClause,
    });

    // Get paginated users
    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        type: true,
        role: true,
        branchId: true,
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: users,
      total,
      totalPages,
      currentPage: page,
      message: "لیست کاربران با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[USER_GETALL_ACTION]:", error);
    return {
      success: false,
      message: "خطا در دریافت کاربران",
      error: error.message,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        type: true,
        role: true,
        branchId: true,
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "کاربر یافت نشد",
        error: { code: "P2025" },
      };
    }
    return {
      success: true,
      data: user,
      message: "اطلاعات کاربر با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[USER_GETBYID_ACTION]:", error);
    return {
      success: false,
      message: "خطا در دریافت کاربر",
      error: error.message,
    };
  }
};

export const POST = async (data) => {
  try {
    // Hash password using the same function as auth
    const hashedPassword = await generatePasswordHash(data.password);

    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: hashedPassword, // Use hashed password
        type: data.type || "user",
        role: data.role || "customer",
        branchId: data.branchId || null,
        isActive: data.isActive ?? true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        type: true,
        role: true,
        branchId: true,
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        isActive: true,
        createdAt: true,
      },
    });
    return {
      success: true,
      data: newUser,
      message: "کاربر جدید با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("[USER_POST_ACTION]:", error);
    return {
      success: false,
      message: "خطا در ایجاد کاربر",
      error: error.message,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const { id, ...updateData } = data;

    // Hash password if it's being updated
    if (updateData.password) {
      updateData.password = await generatePasswordHash(updateData.password);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        type: true,
        role: true,
        branchId: true,
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        isActive: true,
        createdAt: true,
      },
    });
    return {
      success: true,
      data: updated,
      message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("[USER_PATCH_ACTION]:", error);
    return {
      success: false,
      message: "خطا در به‌روزرسانی کاربر",
      error: error.message,
    };
  }
};

export const DELETE = async (id) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return {
      success: true,
      data: { id },
      message: "کاربر با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("[USER_DELETE_ACTION]:", error);
    return {
      success: false,
      message: "خطا در حذف کاربر",
      error: error.message,
    };
  }
};

// Assign role to user
export const ASSIGN_USER_ROLE = async (data) => {
  try {
    const { userId, role, branchId } = data;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
        branchId: role === "branchManager" ? branchId : null,
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: updatedUser,
      message: "نقش کاربر با موفقیت تعیین شد",
    };
  } catch (error) {
    console.error("[ASSIGN_ROLE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در تعیین نقش کاربر",
      error: error.message,
    };
  }
};

// Get users with roles and permissions
export const GET_USERS_WITH_ROLES = async (filters = {}) => {
  try {
    // Extract pagination parameters
    const page = Math.max(1, parseInt(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(filters.limit) || 10));
    const offset = (page - 1) * limit;

    // Extract sorting parameters
    const sortField = filters.sort || "createdAt";
    const sortOrder =
      (filters.order || "desc").toLowerCase() === "asc" ? "asc" : "desc";

    // Validate sort field
    const allowedSortFields = [
      "createdAt",
      "firstName",
      "lastName",
      "email",
      "role",
      "type",
    ];
    const orderBy = allowedSortFields.includes(sortField)
      ? { [sortField]: sortOrder }
      : { createdAt: "desc" };

    // Build dynamic where clause
    const whereClause = {
      role: {
        not: "customer", // Base filter to exclude customers
      },
    };
    const searchConditions = [];

    // Apply additional filters
    if (filters.type) {
      whereClause.type = filters.type;
    }

    if (filters.role) {
      // Override the base filter if specific role is requested
      whereClause.role = filters.role;
    }

    if (filters.excludeRole) {
      if (filters.excludeRole === "customer") {
        // Keep the base filter
        whereClause.role = { not: "customer" };
      } else {
        // Exclude specific role but keep customer exclusion
        whereClause.AND = [
          { role: { not: "customer" } },
          { role: { not: filters.excludeRole } },
        ];
        delete whereClause.role;
      }
    }

    // Combine type and excludeRole filters
    if (
      filters.type &&
      filters.excludeRole &&
      filters.excludeRole !== "customer"
    ) {
      whereClause.AND = [
        { type: filters.type },
        { role: { not: "customer" } },
        { role: { not: filters.excludeRole } },
      ];
      delete whereClause.type;
      delete whereClause.role;
    }

    // Search functionality
    if (filters.search) {
      const searchTerm = filters.search.trim();
      if (searchTerm) {
        searchConditions.push(
          { firstName: { contains: searchTerm, mode: "insensitive" } },
          { lastName: { contains: searchTerm, mode: "insensitive" } },
          { email: { contains: searchTerm, mode: "insensitive" } },
          { mobileNumber: { contains: searchTerm } }
        );

        // Add search conditions to where clause
        if (whereClause.AND) {
          whereClause.AND.push({ OR: searchConditions });
        } else if (whereClause.OR) {
          whereClause.AND = [{ OR: whereClause.OR }, { OR: searchConditions }];
          delete whereClause.OR;
        } else {
          whereClause.OR = searchConditions;
        }
      }
    }

    console.log(
      "[WHERE_CLAUSE_WITH_ROLES]:",
      JSON.stringify(whereClause, null, 2)
    );

    // Get total count for pagination
    const total = await prisma.user.count({
      where: whereClause,
    });

    // Get paginated users
    const users = await prisma.user.findMany({
      where: whereClause,
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
      },
      orderBy,
      skip: offset,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: users,
      total,
      totalPages,
      currentPage: page,
      message: "لیست کاربران با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[GET_USERS_WITH_ROLES_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت لیست کاربران",
      error: error.message,
    };
  }
};

// Add permissions (keeps existing ones)
export const ADD_USER_PERMISSIONS = async (data) => {
  try {
    const { userId, permissions } = data;

    if (permissions && permissions.length > 0) {
      // Add new permissions without removing existing ones
      await prisma.userPermission.createMany({
        data: permissions.map((perm) => ({
          userId,
          permission: perm.permission,
          branchId: perm.branchId || null,
        })),
        skipDuplicates: true, // Skip if permission already exists
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    return {
      success: true,
      data: user,
      message: "مجوزهای جدید با موفقیت اضافه شد",
    };
  } catch (error) {
    console.error("[ADD_PERMISSIONS_ERROR]:", error);
    return {
      success: false,
      message: "خطا در اضافه کردن مجوزها",
      error: error.message,
    };
  }
};

// Replace all permissions (full replacement) - This is now the main ASSIGN function
export const ASSIGN_USER_PERMISSIONS = async (data) => {
  try {
    const { userId, permissions } = data;

    // Remove all existing permissions
    await prisma.userPermission.deleteMany({
      where: { userId },
    });

    // Add new permissions
    if (permissions && permissions.length > 0) {
      await prisma.userPermission.createMany({
        data: permissions.map((perm) => ({
          userId,
          permission: perm.permission,
          branchId: perm.branchId || null,
        })),
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    return {
      success: true,
      data: user,
      message: "مجوزهای کاربر با موفقیت تعیین شد",
    };
  } catch (error) {
    console.error("[ASSIGN_PERMISSIONS_ERROR]:", error);
    return {
      success: false,
      message: "خطا در تعیین مجوزهای کاربر",
      error: error.message,
    };
  }
};

// Alias for full replacement (same as ASSIGN_USER_PERMISSIONS)
export const REPLACE_USER_PERMISSIONS = ASSIGN_USER_PERMISSIONS;

// Remove permissions
export const REMOVE_USER_PERMISSIONS = async (data) => {
  try {
    const { userId, permissions } = data;

    if (permissions && permissions.length > 0) {
      // Remove specific permissions
      for (const perm of permissions) {
        await prisma.userPermission.deleteMany({
          where: {
            userId,
            permission: perm.permission,
            branchId: perm.branchId || null,
          },
        });
      }
    } else {
      // Remove all permissions if no specific permissions provided
      await prisma.userPermission.deleteMany({
        where: { userId },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    return {
      success: true,
      data: user,
      message: "مجوزها با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("[REMOVE_PERMISSIONS_ERROR]:", error);
    return {
      success: false,
      message: "خطا در حذف مجوزها",
      error: error.message,
    };
  }
};

// Update user status (active/inactive)
export const UPDATE_USER_STATUS = async (data) => {
  try {
    const { userId, isActive, currentUserId, currentUserRole } = data;

    // Get target user details
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        role: true,
        type: true,
        isActive: true,
        branchId: true,
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    if (!targetUser) {
      return {
        success: false,
        message: "کاربر یافت نشد",
        error: { code: "P2025", message: "User not found" },
      };
    }

    // Self-deactivation prevention
    if (userId === currentUserId) {
      return {
        success: false,
        message: "شما نمی‌توانید حساب کاربری خود را غیرفعال کنید",
        error: {
          code: "SELF_DEACTIVATION",
          message: "Cannot deactivate own account",
        },
      };
    }

    // Permission checks based on role hierarchy
    if (currentUserRole === "admin") {
      // Admin cannot deactivate superAdmin or other admins
      if (targetUser.role === "superAdmin" || targetUser.role === "admin") {
        return {
          success: false,
          message: "شما اجازه تغییر وضعیت این کاربر را ندارید",
          error: {
            code: "INSUFFICIENT_PERMISSION",
            message: "Insufficient permission",
          },
        };
      }
    }

    // Update user status
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isActive,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        role: true,
        type: true,
        isActive: true,
        branchId: true,
        updatedAt: true,
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    // Log the status change (optional audit trail)
    console.log(
      `[USER_STATUS_CHANGE] User ${currentUserId} (${currentUserRole}) ${
        isActive ? "activated" : "deactivated"
      } user ${userId} (${targetUser.role})`
    );

    return {
      success: true,
      data: updatedUser,
      message: isActive
        ? "حساب کاربری با موفقیت فعال شد"
        : "حساب کاربری با موفقیت غیرفعال شد",
    };
  } catch (error) {
    console.error("[UPDATE_USER_STATUS_ERROR]:", error);
    return {
      success: false,
      message: "خطا در تغییر وضعیت کاربر",
      error: error.message,
    };
  }
};
