import prisma from "../utils/prisma.js";

const cartSelectFields = {
  id: true,
  foodId: true,
  customerId: true,
  deliverId: true,
  branchId: true,
  price: true,
  payment: true,
  status: true,
  createdAt: true,
};

export const GETBYCUSTOMER = async (customerId) => {
  try {
    const carts = await prisma.cart.findMany({
      where: { customerId },
      select: cartSelectFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: carts,
      message: "سبدهای خرید کاربر با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[CART_GET_BY_CUSTOMER_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت سبدهای خرید کاربر",
      error: error.message,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { id },
      select: cartSelectFields,
    });

    if (!cart) {
      return {
        success: false,
        message: "سبد خرید مورد نظر یافت نشد",
        error: { code: "P2025" },
      };
    }

    return {
      success: true,
      data: cart,
      message: "سبد خرید با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[CART_GET_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت سبد خرید",
      error: error.message,
    };
  }
};

export const POST = async (data) => {
  try {
    const requiredFields = ["foodId", "customerId", "branchId"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `فیلدهای الزامی: ${missingFields.join(", ")}`,
        error: "ValidationError",
      };
    }

    const newCart = await prisma.cart.create({
      data: {
        foodId: data.foodId,
        customerId: data.customerId,
        branchId: data.branchId,
        deliverId: data.deliverId,
        price: data.price || "0",
        payment: Boolean(data.payment),
        status: "ONE",
      },
      select: cartSelectFields,
    });

    return {
      success: true,
      data: newCart,
      message: "سبد خرید جدید با موفقیت ایجاد شد",
    };
  } catch (error) {
    console.error("[CART_CREATE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در ایجاد سبد خرید جدید",
      error: error.message,
    };
  }
};

export const PATCH = async ({ id, status }) => {
  try {
    const validStatuses = ["ONE", "TWO", "THREE", "FOUR"];
    if (!validStatuses.includes(status)) {
      return {
        success: false,
        message: "وضعیت نامعتبر برای سبد خرید",
        error: "InvalidStatus",
      };
    }

    const updated = await prisma.cart.update({
      where: { id },
      data: { status },
      select: cartSelectFields,
    });

    return {
      success: true,
      data: updated,
      message: "وضعیت سبد خرید با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("[CART_UPDATE_STATUS_ERROR]:", error);
    return {
      success: false,
      message: "خطا در به‌روزرسانی وضعیت سبد خرید",
      error: error.message,
    };
  }
};

export const DELETE = async (id) => {
  try {
    await prisma.cart.delete({
      where: { id },
    });
    return {
      success: true,
      data: { id },
      message: "سبد خرید با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("[CART_DELETE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در حذف سبد خرید",
      error: error.message,
    };
  }
};
