import models from "../models/index.js";

const { OrderModel } = models;

export const GET = async () => {
  try {
    const orders = await OrderModel.find();
    return {
      orders,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ORDERS_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYUSER = async (id) => {
  try {
    const orders = await OrderModel.find({userId: id});
    return {
      orders,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ORDERS_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const order = await OrderModel.findOne({ id: id });
    return {
      order,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ORDER_ACTION_GETBYID]", error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newOrder = new OrderModel(data);
    console.log(newOrder);

    await newOrder.save();
    return {
      newOrder: newOrder.code,
      success: true,
      message: "سفارش با موفقیت ایجاد شد",
      error: null,
    };
  } catch (error) {
    console.error("[ORDER_ACTION_POST]");
    console.log(error);

    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const updated = await OrderModel.findOneAndUpdate(
      { id: data.id },
      data
    ).exec();
    return {
      updated,
      success: true,
      message: "سفارش با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[ORDER_ACTION_PATCH]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    const deleted = await OrderModel.findOneAndDelete({ id }).exec();
    return {
      deleted,
      success: true,
      message: "سفارش با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[ORDER_ACTION_DELETE]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};
