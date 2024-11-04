import models from "../models/index.js";

const { UserModel } = models;

export const GET = async () => {
  try {
    const users = await UserModel.find();
    return {
      users,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[USER_GETALL_ACTION]=> " + error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const user = await UserModel.findOne({ id: id });
    return {
      user,
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
    const newUser = new UserModel(data);
    await newUser.save();
    return {
      newUser,
      success: true,
      message: "کاربر با موفقیت ایجاد شد",
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
    const updated = await UserModel.findOneAndUpdate(
      { id: data.id },
      data
    ).exec();
    return {
      updated,
      success: true,
      message: "کاربر با موفقیت ویرایش شد",
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
    const deleted = await UserModel.findOneAndDelete({ id }).exec();
    return {
      deleted,
      success: true,
      message: "کاربر با موفقیت حذف شد",
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
