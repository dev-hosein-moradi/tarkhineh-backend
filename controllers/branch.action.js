import models from "../models/index.js";

const { BranchModel } = models;

export const GET = async () => {
  try {
    const branchs = await BranchModel.find();
    return branchs;
  } catch (error) {
    console.error("[BRANCH_ACTION_GET]");
    return [];
  }
};

export const GETBYID = async (id) => {
  try {
    const branch = await BranchModel.findById({ id });
    return branch;
  } catch (error) {
    console.error("[BRANCH_ACTION_GETBYID]");
    return null;
  }
};

export const POST = async (data) => {
  try {
    const newBranch = new BranchModel(data);
    await newBranch.save();
    return true;
  } catch (error) {
    console.error("[BRANCH_ACTION_POST]");
    return false;
  }
};

export const PATCH = async (data) => {
  try {
    await BranchModel.findOneAndUpdate({ id: data.id }, data).exec();
    return true;
  } catch (error) {
    console.error("[BRANCH_ACTION_PATCH]");
    return false;
  }
};

export const DELETE = async (id) => {
  try {
    await BranchModel.findOneAndDelete({ id }).exec();
    return true;
  } catch (error) {
    console.error("[BRANCH_ACTION_DELETE]");
    return false;
  }
};
