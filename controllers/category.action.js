import prisma from "../utils/prisma.js";

const categorySelectFields = {
  id: true,
  name: true,
  title: true,
  image: true,
  createdAt: true,
};

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: categorySelectFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: categories,
      message: "لیست دسته‌بندی‌ها با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[CATEGORY_GET_ALL_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت لیست دسته‌بندی‌ها",
      error: error.message,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      select: categorySelectFields,
    });

    if (!category) {
      return {
        success: false,
        message: "دسته‌بندی مورد نظر یافت نشد",
        error: { code: "P2025" },
      };
    }

    return {
      success: true,
      data: category,
      message: "اطلاعات دسته‌بندی با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[CATEGORY_GET_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت اطلاعات دسته‌بندی",
      error: error.message,
    };
  }
};

export const POST = async (data) => {
  try {
    if (!data.name || !data.title) {
      return {
        success: false,
        message: "نام و عنوان دسته‌بندی الزامی است",
        error: "ValidationError",
      };
    }

    const newCategory = await prisma.category.create({
      data: {
        name: data.name,
        title: data.title,
        image: data.image || "",
      },
      select: categorySelectFields,
    });

    return {
      success: true,
      data: newCategory,
      message: "دسته‌بندی جدید با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("[CATEGORY_CREATE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در ایجاد دسته‌بندی جدید",
      error: error.message,
    };
  }
};

export const PATCH = async ({ id, ...data }) => {
  try {
    const updated = await prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        title: data.title,
        image: data.image,
      },
      select: categorySelectFields,
    });

    return {
      success: true,
      data: updated,
      message: "دسته‌بندی با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("[CATEGORY_UPDATE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در به‌روزرسانی دسته‌بندی",
      error: error.message,
    };
  }
};

export const DELETE = async (id) => {
  try {
    await prisma.category.delete({
      where: { id },
    });
    return {
      success: true,
      data: { id },
      message: "دسته‌بندی با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("[CATEGORY_DELETE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در حذف دسته‌بندی",
      error: error.message,
    };
  }
};
