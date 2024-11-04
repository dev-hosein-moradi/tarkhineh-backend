import models from "../models/index.js";

const { CategoryModel } = models;

export const GET = async () => {
  try {
    const categories = await CategoryModel.find();
    return {
      categories,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[CATEGORY_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const category = await CategoryModel.findOne({ id: id });
    return {
      category,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[CATEGORY_ACTION_GETBYID]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newCategory = new CategoryModel(data);
    await newCategory.save();
    return {
      newCategory,
      success: true,
      message: "ثبت دسته بندی با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[CATEGORY_ACTION_POST]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const updated = await CategoryModel.findOneAndUpdate(
      { id: data.id },
      data
    ).exec();
    return {
      updated,
      success: true,
      message: "ویرایش دسته بندی با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[CATEGORY_ACTION_PATCH]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    const deleted = await CategoryModel.findOneAndDelete({ id }).exec();
    return {
      deleted,
      success: true,
      message: "حذف دسته بندی با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[CATEGORY_ACTION_DELETE]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};
