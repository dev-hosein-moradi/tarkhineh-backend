import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./order.action.js";

export const getOrdersHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const orders = await GET();
    // if (reqId) {
    //   cache.set(reqId, orders);
    // }

    if (orders.success) {
      res.status(200).json({
        data: orders.orders,
        error: orders.error,
        ok: orders.success,
        message: orders.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت سفارشات مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ORDERS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getOrdersByUserHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const orders = await GET();
    // if (reqId) {
    //   cache.set(reqId, orders);
    // }

    if (orders.success) {
      res.status(200).json({
        data: orders.orders,
        error: orders.error,
        ok: orders.success,
        message: orders.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت سفارشات مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ORDERS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getOrderHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const order = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, order);
    // }

    if (order.success) {
      res.status(200).json({
        data: order.message,
        error: order.error,
        ok: order.success,
        message: order.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت سفارش مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ORDER_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addOrderHandler = async (req, res) => {
  try {
    console.log(req.authData);

    const order = await POST(req.body);

    if (order.success) {
      res.status(200).json({
        data: order.newOrder,
        error: order.error,
        ok: order.success,
        message: order.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ایجاد سفارش مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ORDER_CONTROLLER_POST]");
    console.log(error);

    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateOrderHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const order = await PATCH(req.body);

    if (order.success) {
      res.status(200).json({
        data: order.updated,
        error: order.error,
        ok: order.success,
        message: order.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش سفارش مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ORDER_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteOrderHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const order = await DELETE(req.body);
    if (order.success) {
      res.status(200).json({
        data: order.deleted,
        error: order.error,
        ok: order.success,
        message: order.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در حذف سفارش مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ORDERS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
