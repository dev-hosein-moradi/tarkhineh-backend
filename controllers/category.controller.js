import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./category.action.js";

export const getCategoriesHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const categories = await GET();
    cache.set(reqId, categories);

    res.status(200).json({
      data: categories,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get category",
    });
  }
};

export const getCategoryHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const category = await GETBYID(req.params.id);
    cache.set(reqId, category);

    res.status(200).json({
      data: category,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get category",
    });
  }
};

export const addCategoryHandler = async (req, res) => {
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

    const category = await POST(req.body);
    res.status(200).json({
      data: category,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get category",
    });
  }
};

export const updateCategoryHandler = async (req, res) => {
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

    const category = await PATCH(req.body);
    res.status(200).json({
      data: category,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get category",
    });
  }
};

export const deleteCategoryHandler = async (req, res) => {
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

    const category = await DELETE(req.body);
    res.status(200).json({
      data: category,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get category",
    });
  }
};
