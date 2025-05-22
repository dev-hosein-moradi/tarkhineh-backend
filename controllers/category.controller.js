import {
  GET,
  GETBYID,
  POST,
  PATCH,
  DELETE,
} from "../actions/category.action.js";

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

export const getCategoriesHandler = async (req, res) => {
  try {
    const result = await GET();
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در دریافت دسته‌بندی‌ها",
        error: error.message,
      },
      500
    );
  }
};

export const getCategoryHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در دریافت دسته‌بندی",
        error: error.message,
      },
      500
    );
  }
};

export const addCategoryHandler = async (req, res) => {
  try {
    const result = await POST(req.body);
    handleResponse(res, result, 201);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در ایجاد دسته‌بندی",
        error: error.message,
      },
      500
    );
  }
};

export const updateCategoryHandler = async (req, res) => {
  try {
    const result = await PATCH({
      id: req.params.id,
      ...req.body,
    });
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در به‌روزرسانی دسته‌بندی",
        error: error.message,
      },
      500
    );
  }
};

export const deleteCategoryHandler = async (req, res) => {
  try {
    const result = await DELETE(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در حذف دسته‌بندی",
        error: error.message,
      },
      500
    );
  }
};
