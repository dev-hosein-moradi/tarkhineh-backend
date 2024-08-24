import models from "../models/index.js";

const { CategoryModel } = models;

export const GET = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    console.error("[CATEGORY_ACTION_GET]");
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const category = await CategoryModel.findOne({ id: id });
    return category;
  } catch (error) {
    console.error("[CATEGORY_ACTION_GETBYID]");
    return null;
  }
};

export const POST = async (data) => {
  try {
    const newCategory = new CategoryModel(data);
    await newCategory.save();
    return true;
  } catch (error) {
    console.error("[CATEGORY_ACTION_POST]");
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await CategoryModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[CATEGORY_ACTION_PATCH]");
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await CategoryModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[CATEGORY_ACTION_DELETE]");
    return false;
  }
};
