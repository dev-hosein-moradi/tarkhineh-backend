import models from "../models/index.js";

const { UserModel } = models;

export const GET = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    console.error("[USER_GETALL_ACTION]=> " + error);
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.error("[FOODS_GETBYID_ACTION]=> " + error);
    return [];
  }
};

export const POST = async (data) => {
  try {
    const newUser = new UserModel(data);
    await newUser.save();
    return true;
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await UserModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await UserModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return false;
  }
};
