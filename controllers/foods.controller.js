import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./foods.action.js";

export const getFoodsHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const foods = await GET();
    // if (reqId) {
    //   cache.set(reqId, foods);
    // }

    if (foods.success) {
      res.status(200).json({
        data: foods.foods,
        error: foods.error,
        ok: foods.success,
        message: foods.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت محصولات مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getFoodHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const food = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, food);
    // }
    if (food.success) {
      res.status(200).json({
        data: food.food,
        error: food.error,
        ok: food.success,
        message: food.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت محصول مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addFoodHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const food = await POST(req.body);

    if (food.success) {
      res.status(200).json({
        data: food.newFood,
        error: food.error,
        ok: food.success,
        message: food.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ایجاد محصول مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateFoodHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const food = await PATCH(req.body);

    if (food.success) {
      res.status(200).json({
        data: food.updated,
        error: food.error,
        ok: food.success,
        message: food.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش محصول مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteFoodHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const food = await DELETE(req.body);

    if (food.success) {
      res.status(200).json({
        data: food.deleted,
        error: food.error,
        ok: food.success,
        message: food.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در حذف محصول مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
