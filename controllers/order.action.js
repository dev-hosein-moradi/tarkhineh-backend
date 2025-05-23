import prisma from "../utils/prisma.js";

const orderFields = {
  id: true,
  userId: true,
  code: true,
  status: true,
  userAddress: true,
  price: true,
  discount: true,
  time: true,
  deliverType: true,
  paymentType: true,
  branchId: true,
  createdAt: true,
};

export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
      select: orderFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: orders,
      message: "لیست سفارشات با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[ORDER_GET_ALL_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت لیست سفارشات",
      error: error.message,
    };
  }
};

export const GETBYUSER = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      select: orderFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: orders,
      message: "سفارشات کاربر با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[ORDER_GET_BY_USER_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت سفارشات کاربر",
      error: error.message,
    };
  }
};

export const GETBYID = async (orderId) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: orderFields,
    });

    if (!order) {
      return {
        success: false,
        message: "سفارش مورد نظر یافت نشد",
        error: { code: "P2025" },
      };
    }

    return {
      success: true,
      data: order,
      message: "اطلاعات سفارش با موفقیت دریافت شد",
    };
  } catch (error) {
    console.error("[ORDER_GET_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "خطا در دریافت اطلاعات سفارش",
      error: error.message,
    };
  }
};

export const POST = async (orderData) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        ...orderData,
        foods: orderData.foods || [],
        status: "ONE", // Default status
        deliverType: orderData.deliverType || "ONE",
        paymentType: orderData.paymentType || "ONE",
      },
      select: orderFields,
    });

    return {
      success: true,
      data: newOrder,
      message: "سفارش جدید با موفقیت ثبت شد",
    };
  } catch (error) {
    console.error("[ORDER_CREATE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در ثبت سفارش جدید",
      error: error.message,
    };
  }
};

export const PATCH = async ({ id, status }) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
      select: orderFields,
    });

    return {
      success: true,
      data: updatedOrder,
      message: "وضعیت سفارش با موفقیت به‌روزرسانی شد",
    };
  } catch (error) {
    console.error("[ORDER_UPDATE_STATUS_ERROR]:", error);
    return {
      success: false,
      message: "خطا در به‌روزرسانی وضعیت سفارش",
      error: error.message,
    };
  }
};

export const DELETE = async (orderId) => {
  try {
    await prisma.order.delete({
      where: { id: orderId },
    });

    return {
      success: true,
      data: { id: orderId },
      message: "سفارش با موفقیت حذف شد",
    };
  } catch (error) {
    console.error("[ORDER_DELETE_ERROR]:", error);
    return {
      success: false,
      message: "خطا در حذف سفارش",
      error: error.message,
    };
  }
};
