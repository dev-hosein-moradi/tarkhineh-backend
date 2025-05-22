import prisma from "../utils/prisma.js";

export const GET = async () => {
  try {
    const addresses = await prisma.address.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      addresses,
      success: true,
      message: "عملیات با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GET]", error);
    return {
      success: false,
      message: "خطا در دریافت آدرس ها",
      error,
    };
  }
};

export const GETBYUSER = async (userId) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: userId },
    });
    return {
      addresses,
      success: true,
      message: "عملیات با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GETBYUSER]", error);
    return {
      success: false,
      message: "خطا در دریافت آدرس",
      error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id: id },
    });
    return {
      address,
      success: true,
      message: "عملیات با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GETBYID]", error);
    return {
      success: false,
      message: "خطا در دریافت آدرس",
      error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newAddress = await prisma.address.create({
      data,
    });
    return {
      newAddress,
      success: true,
      message: "آدرس با موفقیت ثبت شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_POST]", error);
    return {
      success: false,
      message: error.message || "خطا در ثبت آدرس",
      error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const updated = await prisma.address.update({
      where: { id: data.id },
      data,
    });
    return {
      updated,
      success: true,
      message: "آدرس با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_PATCH]", error);
    return {
      success: false,
      message: error.message || "خطا در ویرایش آدرس",
      error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    if (!id) throw new Error("شناسه شعبه ضروری است");

    const deleted = await prisma.address.delete({
      where: { id },
    });
    return {
      deleted,
      success: true,
      message: "آدرس با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_DELETE]", error);
    return {
      success: false,
      message: error.message || "خطا در حذف آدرس",
      error,
    };
  }
};
