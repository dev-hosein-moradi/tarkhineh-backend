import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./branch.action.js";

export const getBranchsHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const branchs = await GET();
    if (reqId) {
      cache.set(reqId, branchs);
    }

    res.status(200).json({
      data: branchs,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get branchs",
    });
  }
};

export const getBranchHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const branch = await GETBYID(req.params.id);
    cache.set(reqId, branch);

    res.status(200).json({
      data: branch,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get branch",
    });
  }
};

export const addBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const branch = await POST(req.body);
    res.status(200).json({
      data: branch,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get foods",
    });
  }
};

export const updateBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const branch = await PATCH(req.body);
    res.status(200).json({
      data: branch,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get foods",
    });
  }
};

export const deleteBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const branch = await DELETE(req.body);
    res.status(200).json({
      data: branch,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get foods",
    });
  }
};
