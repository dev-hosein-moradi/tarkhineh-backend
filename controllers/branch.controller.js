import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./branch.action.js";

export const getBranchsHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const branchs = await GET();
    // if (reqId) {
    //   cache.set(reqId, branchs);
    // }
    if (branchs.success) {
      res.status(200).json({
        data: branchs.branchs,
        error: branchs.error,
        ok: branchs.success,
        message: branchs.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت شعبه ها مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getBranchHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const branch = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, branch);
    // }
    if (branch.success) {
      res.status(200).json({
        data: branch.branch,
        error: branch.error,
        ok: branch.success,
        message: branch.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت شعبه مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const branch = await POST(req.body);
    if (branch.success) {
      res.status(200).json({
        data: branch.newBranch,
        error: branch.error,
        ok: branch.success,
        message: branch.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ثبت شعبه مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const branch = await PATCH(req.body);

    if (branch.success) {
      res.status(200).json({
        data: branch.updated,
        error: branch.error,
        ok: branch.success,
        message: branch.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش شعبه مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const branch = await DELETE(req.body);

    if (branch.success) {
      res.status(200).json({
        data: branch.deleted,
        error: branch.error,
        ok: branch.success,
        message: branch.message,
      });
    }
    res.status(400).json({
      data: null,
      error: "error",
      ok: false,
      message: "در حذف شعبه مشکلی پیش آمده است",
    });
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
