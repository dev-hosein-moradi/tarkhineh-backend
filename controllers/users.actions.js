import prisma from "../utils/prisma.js";

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
    const newUser = await prisma.user.create({
      data: {
        ...data,
        type: data.type || "user",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        mobileNumber: true,
        type: true,
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
