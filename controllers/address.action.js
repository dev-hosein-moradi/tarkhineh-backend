import models from "../models/index.js";

const { AddressModel } = models;

export const GET = async () => {
  try {
    const addresses = await AddressModel.find();
    return {
      addresses,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYUSER = async (id) => {
  try {
    const addresses = await AddressModel.find({ userId: id });

    return {
      addresses,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const address = await AddressModel.findOne({ id: id });
    return {
      address,
      success: true,
      message: "دریافت موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_GETBYID]", error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newAddress = new AddressModel(data);
    console.log("action" + newAddress);
    await newAddress.save();
    return {
      newAddress,
      success: true,
      message: "آدرس با موفقیت ثبت شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_POST]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const updated = await AddressModel.findOneAndUpdate(
      { id: data.id },
      data
    ).exec();
    return {
      updated,
      success: true,
      message: "آدرس با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_PATCH]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    const deleted = await AddressModel.findOneAndDelete({ id }).exec();
    return {
      deleted,
      success: true,
      message: "آدرس با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[ADDRESS_ACTION_DELETE]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};
