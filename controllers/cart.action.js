import models from "../models/index.js";

const { CartModel } = models;

export const GET = async () => {
  try {
    const carts = await CartModel.find();
    return {
      carts,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[CART_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const cart = await CartModel.findOne({ id: id });
    return {
      cart,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[CART_ACTION_GETBYID]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newcart = new CartModel(data);
    await newcart.save();
    return {
      carts,
      success: true,
      message: "سبد با موفقیت ثبت شد",
      error: null,
    };
  } catch (error) {
    console.error("[CART_ACTION_POST]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    await CartModel.findOneAndUpdate({ id: data.id }, data).exec();
    return {
      carts,
      success: true,
      message: "سبد با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[CART_ACTION_PATCH]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    await CartModel.findOneAndDelete({ id }).exec();
    return {
      carts,
      success: true,
      message: "ثبت با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[CART_ACTION_DELETE]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};
