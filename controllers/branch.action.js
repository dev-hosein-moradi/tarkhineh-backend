import models from "../models/index.js";

const { BranchModel } = models;

export const GET = async () => {
  try {
    const branchs = await BranchModel.find();
    return {
      branchs,
      success: true,
      message: " موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_GET]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const branch = await BranchModel.findOne({ id: id });
    console.log(branch);
    console.log(id);

    return {
      branch,
      success: true,
      message: " موفقیت آمیز",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_GETBYID]", error);
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const POST = async (data) => {
  try {
    const newBranch = new BranchModel(data);
    await newBranch.save();
    return {
      newBranch,
      success: true,
      message: "شعبه با موفقیت ثبت شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_POST]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const PATCH = async (data) => {
  try {
    const updated = await BranchModel.findOneAndUpdate(
      { id: data.id },
      data
    ).exec();
    return {
      updated,
      success: true,
      message: "شعبه با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_PATCH]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};

export const DELETE = async (id) => {
  try {
    const deleted = await BranchModel.findOneAndDelete({ id }).exec();
    return {
      deleted,
      success: true,
      message: "شعبه با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_DELETE]");
    return {
      success: false,
      message: "خطا",
      error: error,
    };
  }
};
