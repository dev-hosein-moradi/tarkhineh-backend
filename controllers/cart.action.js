import models from "../models/index.js";

const { CartModel } = models;

export const GET = async () => {
  try {
    const carts = await CartModel.find();
    return carts;
  } catch (error) {
    console.error("[CART_ACTION_GET]");
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const cart = await CartModel.findById({ id });
    return cart;
  } catch (error) {
    console.error("[CART_ACTION_GETBYID]");
    return null;
  }
};

export const POST = async (data) => {
  try {
    const newcart = new CartModel(data);
    await newcart.save();
    return true;
  } catch (error) {
    console.error("[CART_ACTION_POST]");
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await CartModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[CART_ACTION_PATCH]");
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await CartModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[CART_ACTION_DELETE]");
    return false;
  }
};
