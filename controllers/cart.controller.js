import { GETBYID, GETBYCUSTOMER, POST, PATCH, DELETE } from "./cart.action.js";

const handleResponse = (res, result, successStatus = 200) => {
  const response = {
    ok: result.success,
    data: result.data,
    message: result.message,
    error: result.error || null,
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

export const getCartsHandler = async (req, res) => {
  try {
    const result = await GETBYCUSTOMER(req.params.customerId);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در دریافت سبدهای خرید",
        error: error.message,
      },
      500
    );
  }
};

export const getCartHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در دریافت سبد خرید",
        error: error.message,
      },
      500
    );
  }
};

export const addCartHandler = async (req, res) => {
  try {
    const result = await POST({
      ...req.body,
      customerId: req.user.id, // Ensure cart belongs to authenticated user
    });
    handleResponse(res, result, 201);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در ایجاد سبد خرید",
        error: error.message,
      },
      500
    );
  }
};

export const updateCartHandler = async (req, res) => {
  try {
    const result = await PATCH({
      id: req.params.id,
      status: req.body.status, // Only allow status updates
    });
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در به‌روزرسانی سبد خرید",
        error: error.message,
      },
      500
    );
  }
};

export const deleteCartHandler = async (req, res) => {
  try {
    const result = await DELETE(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در حذف سبد خرید",
        error: error.message,
      },
      500
    );
  }
};
