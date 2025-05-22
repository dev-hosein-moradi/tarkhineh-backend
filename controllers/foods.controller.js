import { GET, GETBYID, POST, PATCH, DELETE } from "../actions/food.action.js";

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

export const getFoodsHandler = async (req, res) => {
  try {
    const result = await GET();
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      500
    );
  }
};

export const getFoodHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      500
    );
  }
};

export const addFoodHandler = async (req, res) => {
  try {
    const result = await POST(req.body);
    handleResponse(res, result, 201);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      500
    );
  }
};

export const updateFoodHandler = async (req, res) => {
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
        message: "Internal server error",
        error: error.message,
      },
      500
    );
  }
};

export const deleteFoodHandler = async (req, res) => {
  try {
    const result = await DELETE(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    handleResponse(
      res,
      {
        success: false,
        message: "Internal server error",
        error: error.message,
      },
      500
    );
  }
};
