import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./category.action.js";

export const getCategoriesHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const categories = await GET();
    // if (reqId) {
    //   cache.set(reqId, categories);
    // }

    if (categories.success) {
      res.status(200).json({
        data: categories.categories,
        error: categories.error,
        ok: categories.success,
        message: categories.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت دسته بندی ها مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getCategoryHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const category = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, category);
    // }

    if (category.success) {
      res.status(200).json({
        data: category.category,
        error: category.error,
        ok: category.success,
        message: category.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت دسته بندی مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addCategoryHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const category = await POST(req.body);

    if (category.success) {
      res.status(200).json({
        data: category.newCategory,
        error: category.error,
        ok: category.success,
        message: category.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ایجاد دسته بندی مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateCategoryHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const category = await PATCH(req.body);

    if (category.success) {
      res.status(200).json({
        data: category.updated,
        error: category.error,
        ok: category.success,
        message: category.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش دسته بندی مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteCategoryHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const category = await DELETE(req.body);

    if (category.success) {
      res.status(200).json({
        data: category.deleted,
        error: category.error,
        ok: category.success,
        message: category.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در حذف دسته بندی مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CATEGORY_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
