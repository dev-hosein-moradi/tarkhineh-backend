import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./order.action.js";

export const getOrdersHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const orders = await GET();
    // if (reqId) {
    //   cache.set(reqId, orders);
    // }

    res.status(200).json({
      data: orders,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ORDERS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get orders",
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

    res.status(200).json({
      data: order,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ORDER_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get order",
    });
  }
};

export const addOrderHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const order = await POST(req.body);
    res.status(200).json({
      data: order,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ORDER_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get order",
    });
  }
};

export const updateOrderHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const order = await PATCH(req.body);
    res.status(200).json({
      data: order,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ORDER_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get order",
    });
  }
};

export const deleteOrderHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const order = await DELETE(req.body);
    res.status(200).json({
      data: order,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ORDERS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get order",
    });
  }
};
