import models from "../models/index.js";

const { FoodModel } = models;

export const GET = async () => {
  try {
    const foods = await FoodModel.find();
    return {
      foods,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[FOODS_GETALL_ACTION]=> " + error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const food = await FoodModel.findOne({ id: id });
    return {
      food,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[FOODS_GETBYID_ACTION]=> " + error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newFood = new FoodModel(data);
    await newFood.save();
    return {
      newFood,
      success: true,
      message: "محصول با موفقیت ایجاد شد",
      error: null,
    };
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const updated = await FoodModel.findOneAndUpdate(
      { id: data.id },
      data
    ).exec();
    return {
      updated,
      success: true,
      message: "محصول با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    const deleted = await FoodModel.findOneAndDelete({ id }).exec();
    return {
      deleted,
      success: true,
      message: "محصول با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};
