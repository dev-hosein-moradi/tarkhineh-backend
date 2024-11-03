import models from "../models/index.js";

const { OrderModel } = models;

export const GET = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    console.error("[ORDERS_ACTION_GET]");
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const order = await OrderModel.findOne({ id: id });
    return order;
  } catch (error) {
    console.error("[ORDER_ACTION_GETBYID]", error);
    return null;
  }
};

export const POST = async (data) => {
  try {
    const newOrder = new OrderModel(data);
    await newOrder.save();
    return true;
  } catch (error) {
    console.error("[ORDER_ACTION_POST]");
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await OrderModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[ORDER_ACTION_PATCH]");
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await OrderModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[ORDER_ACTION_DELETE]");
    return false;
  }
};
