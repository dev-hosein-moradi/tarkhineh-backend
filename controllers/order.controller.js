import {
  GET,
  GETBYID,
  GETBYUSER,
  POST,
  PATCH,
  DELETE,
} from "../actions/order.action.js";

const handleOrderResponse = (res, result, successStatus = 200) => {
  const response = {
    ok: result.success,
    data: result.data || null,
    error: result.error || null,
    message: result.message || "عملیات موفقیت‌آمیز بود",
  };
  res
    .status(
      result.success
        ? successStatus
        : result.error?.code === "P2025"
        ? 404
        : 400
    )
    .json(response);
};

export const getOrdersHandler = async (req, res) => {
  try {
    const result = await GET();
    handleOrderResponse(res, result);
  } catch (error) {
    handleOrderResponse(
      res,
      {
        success: false,
        error: error.message,
        message: "خطای سرور در دریافت سفارشات",
      },
      500
    );
  }
};

export const getOrdersByUserHandler = async (req, res) => {
  try {
    const result = await GETBYUSER(req.params.userId);
    handleOrderResponse(res, result);
  } catch (error) {
    handleOrderResponse(
      res,
      {
        success: false,
        error: error.message,
        message: "خطای سرور در دریافت سفارشات کاربر",
      },
      500
    );
  }
};

export const getOrderHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.orderId);
    handleOrderResponse(res, result);
  } catch (error) {
    handleOrderResponse(
      res,
      {
        success: false,
        error: error.message,
        message: "خطای سرور در دریافت سفارش",
      },
      500
    );
  }
};

export const addOrderHandler = async (req, res) => {
  try {
    const result = await POST(req.body);
    handleOrderResponse(res, result, 201);
  } catch (error) {
    handleOrderResponse(
      res,
      {
        success: false,
        error: error.message,
        message: "خطای سرور در ایجاد سفارش",
      },
      500
    );
  }
};

export const updateOrderHandler = async (req, res) => {
  try {
    const result = await PATCH({
      id: req.params.orderId,
      status: req.body.status, // Only allow status updates
    });
    handleOrderResponse(res, result);
  } catch (error) {
    handleOrderResponse(
      res,
      {
        success: false,
        error: error.message,
        message: "خطای سرور در به‌روزرسانی سفارش",
      },
      500
    );
  }
};

export const deleteOrderHandler = async (req, res) => {
  try {
    const result = await DELETE(req.params.orderId);
    handleOrderResponse(res, result);
  } catch (error) {
    handleOrderResponse(
      res,
      {
        success: false,
        error: error.message,
        message: "خطای سرور در حذف سفارش",
      },
      500
    );
  }
};
