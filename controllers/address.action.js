import prisma from "../utils/prisma.js";

export const GET = async () => {
  try {
    const addresses = await prisma.address.findMany();
    return {
      addresses,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GET]", error);
    return {
      success: false,
      message: "خطا",
      error,
    };
  }
};

export const GETBYUSER = async (userId) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId },
    });
    return {
      addresses,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GETBYUSER]", error);
    return {
      success: false,
      message: "خطا",
      error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const address = await prisma.address.findUnique({
      where: { id },
    });
    return {
      address,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GETBYID]", error);
    return {
      success: false,
      message: "خطا",
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
      message: "خطا",
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
      message: "خطا",
      error,
    };
  }
};

export const DELETE = async (id) => {
  try {
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
      message: "خطا",
      error,
    };
  }
};
