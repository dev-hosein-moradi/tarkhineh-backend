import models from "../models/index.js";

const { AddressModel } = models;

export const GET = async () => {
  try {
    const addresses = await AddressModel.find();
    return addresses;
  } catch (error) {
    console.error("[ADDRESS_ACTION_GET]");
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const address = await AddressModel.findOne({ id: id });
    return address;
  } catch (error) {
    console.error("[ADDRESS_ACTION_GETBYID]", error);
    return null;
  }
};

export const POST = async (data) => {
  try {
    const newAddress = new AddressModel(data);
    await newAddress.save();
    return true;
  } catch (error) {
    console.error("[ADDRESS_ACTION_POST]");
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await AddressModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[ADDRESS_ACTION_PATCH]");
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await AddressModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[ADDRESS_ACTION_DELETE]");
    return false;
  }
};
