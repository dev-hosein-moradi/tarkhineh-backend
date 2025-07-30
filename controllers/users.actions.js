import prisma from "../utils/prisma.js";
import { generatePasswordHash } from "../helpers/hash.js"; // Use the same as auth

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        type: true,
        role: true, // Add role field
        branchId: true, // Add branchId field
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
      data: users,
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
export const GET_USERS_WITH_ROLES = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "customer",
        },
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
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: users,
      message: "لیست کاربران با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[GET_USERS_ERROR]:", error);
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
