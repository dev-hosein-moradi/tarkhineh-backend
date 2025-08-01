import prisma from "../utils/prisma.js";

// Get all branches with pagination and search
export const GET_BRANCHES = async (filters = {}) => {
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
      "name",
      "title",
      "ownerFullName",
      "verification",
    ];
    const orderBy = allowedSortFields.includes(sortField)
      ? { [sortField]: sortOrder }
      : { createdAt: "desc" };

    // Build search conditions
    const searchConditions = [];
    if (filters.search) {
      const searchTerm = filters.search.trim();
      if (searchTerm) {
        searchConditions.push(
          { name: { contains: searchTerm, mode: "insensitive" } },
          { title: { contains: searchTerm, mode: "insensitive" } },
          { address: { contains: searchTerm, mode: "insensitive" } },
          { ownerFullName: { contains: searchTerm, mode: "insensitive" } },
          { ownerPhone: { contains: searchTerm } }
        );
      }
    }

    // Build where clause
    const whereClause =
      searchConditions.length > 0 ? { OR: searchConditions } : {};

    console.log("[BRANCH_WHERE_CLAUSE]:", JSON.stringify(whereClause, null, 2));

    // Get total count for pagination
    const total = await prisma.branch.count({
      where: whereClause,
    });

    // Get paginated branches
    const branches = await prisma.branch.findMany({
      where: whereClause,
      orderBy,
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        title: true,
        address: true,
        ownerFullName: true,
        ownerPhone: true,
        tel: true,
        verification: true,
        kitchen: true,
        parking: true,
        store: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data: branches,
      total,
      totalPages,
      currentPage: page,
      message: "شعب با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[GET_BRANCHES_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت شعب",
      error: error.message,
    };
  }
};

// Get single branch by ID
export const GET_BRANCH_BY_ID = async (id) => {
  try {
    const branch = await prisma.branch.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        title: true,
        address: true,
        ownerFullName: true,
        ownerPhone: true,
        tel: true,
        verification: true,
        kitchen: true,
        parking: true,
        store: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!branch) {
      return {
        success: false,
        message: "شعبه یافت نشد",
        error: { code: "P2025", message: "Branch not found" },
      };
    }

    return {
      success: true,
      data: branch,
      message: "شعبه با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[GET_BRANCH_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت شعبه",
      error: error.message,
    };
  }
};

// Create new branch
export const CREATE_BRANCH = async (data) => {
  try {
    // Check for duplicate branch name
    const existingBranch = await prisma.branch.findFirst({
      where: { name: data.name },
    });

    if (existingBranch) {
      return {
        success: false,
        message: "شعبه با این نام قبلاً ثبت شده است",
        error: {
          code: "DUPLICATE_NAME",
          message: "Branch name already exists",
        },
      };
    }

    // Create branch
    const branch = await prisma.branch.create({
      data: {
        name: data.name,
        title: data.title,
        address: data.address,
        ownerFullName: data.ownerFullName,
        ownerPhone: data.ownerPhone,
        tel: data.tel || [],
        verification: data.verification || false,
        kitchen: data.kitchen || false,
        parking: data.parking || false,
        store: data.store || false,
      },
      select: {
        id: true,
        name: true,
        title: true,
        address: true,
        ownerFullName: true,
        ownerPhone: true,
        tel: true,
        verification: true,
        kitchen: true,
        parking: true,
        store: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      data: branch,
      message: "شعبه با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("[CREATE_BRANCH_ERROR]:", error);
    return {
      success: false,
      message: "خطا در ایجاد شعبه",
      error: error.message,
    };
  }
};

// Update branch
export const UPDATE_BRANCH = async (id, data) => {
  try {
    // Check if branch exists
    const existingBranch = await prisma.branch.findUnique({
      where: { id },
    });

    if (!existingBranch) {
      return {
        success: false,
        message: "شعبه یافت نشد",
        error: { code: "P2025", message: "Branch not found" },
      };
    }

    // Check for duplicate name if name is being updated
    if (data.name && data.name !== existingBranch.name) {
      const duplicateBranch = await prisma.branch.findFirst({
        where: {
          name: data.name,
          id: { not: id },
        },
      });

      if (duplicateBranch) {
        return {
          success: false,
          message: "شعبه با این نام قبلاً ثبت شده است",
          error: {
            code: "DUPLICATE_NAME",
            message: "Branch name already exists",
          },
        };
      }
    }

    // Update branch
    const updatedBranch = await prisma.branch.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        title: true,
        address: true,
        ownerFullName: true,
        ownerPhone: true,
        tel: true,
        verification: true,
        kitchen: true,
        parking: true,
        store: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      data: updatedBranch,
      message: "شعبه با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("[UPDATE_BRANCH_ERROR]:", error);
    return {
      success: false,
      message: "خطا در به‌روزرسانی شعبه",
      error: error.message,
    };
  }
};

// Toggle branch verification
export const TOGGLE_BRANCH_VERIFICATION = async (
  id,
  verification,
  adminId,
  adminRole
) => {
  try {
    // Check if branch exists
    const existingBranch = await prisma.branch.findUnique({
      where: { id },
    });

    if (!existingBranch) {
      return {
        success: false,
        message: "شعبه یافت نشد",
        error: { code: "P2025", message: "Branch not found" },
      };
    }

    // Update verification status
    const updatedBranch = await prisma.branch.update({
      where: { id },
      data: {
        verification,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        title: true,
        verification: true,
        updatedAt: true,
      },
    });

    // Log verification change
    console.log(
      `[BRANCH_VERIFICATION_CHANGE] Admin ${adminId} (${adminRole}) ${
        verification ? "verified" : "unverified"
      } branch ${id} (${existingBranch.name})`
    );

    return {
      success: true,
      data: updatedBranch,
      message: verification ? "شعبه با موفقیت تایید شد" : "تایید شعبه لغو شد",
    };
  } catch (error) {
    console.error("[TOGGLE_BRANCH_VERIFICATION_ERROR]:", error);
    return {
      success: false,
      message: "خطا در تغییر وضعیت تایید شعبه",
      error: error.message,
    };
  }
};

// Delete branch
export const DELETE_BRANCH = async (id) => {
  try {
    // Check if branch exists
    const existingBranch = await prisma.branch.findUnique({
      where: { id },
      include: {
        users: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    if (!existingBranch) {
      return {
        success: false,
        message: "شعبه یافت نشد",
        error: { code: "P2025", message: "Branch not found" },
      };
    }

    // Check if branch has assigned users
    if (existingBranch.users.length > 0) {
      return {
        success: false,
        message: "این شعبه دارای کاربران فعال است و قابل حذف نیست",
        error: {
          code: "BRANCH_HAS_USERS",
          message: "Branch has active users",
          userCount: existingBranch.users.length,
        },
      };
    }

    // Delete branch
    await prisma.branch.delete({
      where: { id },
    });

    return {
      success: true,
      data: { id },
      message: "شعبه با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("[DELETE_BRANCH_ERROR]:", error);
    return {
      success: false,
      message: "خطا در حذف شعبه",
      error: error.message,
    };
  }
};
