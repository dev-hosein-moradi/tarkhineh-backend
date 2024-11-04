import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./cart.action.js";

export const getCartsHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const carts = await GET();
    // if (reqId) {
    //   cache.set(reqId, carts);
    // }
    if (carts.success) {
      res.status(200).json({
        data: carts.carts,
        error: carts.error,
        ok: carts.success,
        message: carts.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت سبد ها مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CART_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getCartHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const cart = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, cart);
    // }
    if (cart.success) {
      res.status(200).json({
        data: cart.cart,
        error: cart.error,
        ok: cart.success,
        message: cart.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت سبد مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CART_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addCartHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const cart = await POST(req.body);

    if (cart.success) {
      res.status(200).json({
        data: cart.carts,
        error: cart.error,
        ok: cart.success,
        message: cart.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ثبت سبد مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CART_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateCartHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const cart = await PATCH(req.body);

    if (cart.success) {
      res.status(200).json({
        data: cart.carts,
        error: cart.error,
        ok: cart.success,
        message: cart.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش سبد مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CART_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteCartHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const cart = await DELETE(req.body);

    if (cart.success) {
      res.status(200).json({
        data: cart.carts,
        error: cart.error,
        ok: cart.success,
        message: cart.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در حذف سبد مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[CART_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
