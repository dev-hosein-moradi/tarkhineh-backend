import models from "../models/index.js";

const { FoodModel } = models;

export const GET = async () => {
  try {
    const foods = await FoodModel.find();
    return foods;
  } catch (error) {
    console.error("[FOODS_GETALL_ACTION]=> " + error);
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const food = await FoodModel.findOne({ id: id });
    return food;
  } catch (error) {
    console.error("[FOODS_GETBYID_ACTION]=> " + error);
    return [];
  }
};

export const POST = async (data) => {
  try {
    const newFood = new FoodModel(data);
    await newFood.save();
    return true;
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await FoodModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await FoodModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[FOODS_POST_ACTION]=> " + error);
    return false;
  }
};
