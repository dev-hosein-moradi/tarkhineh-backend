import {
  GET,
  GETBYID,
  POST,
  PATCH,
  DELETE,
  GET_ACCOMPANIMENTS,
  GET_ACCOMPANIMENT_BY_ID,
  POST_ACCOMPANIMENT,
  PATCH_ACCOMPANIMENT,
  DELETE_ACCOMPANIMENT,
  GET_ACCOMPANIMENT_CATEGORIES,
  GET_ACCOMPANIMENT_CATEGORY_BY_ID,
  POST_ACCOMPANIMENT_CATEGORY,
  PATCH_ACCOMPANIMENT_CATEGORY,
  DELETE_ACCOMPANIMENT_CATEGORY,
} from "./foods.action.js";

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

// FOOD HANDLERS
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

// ACCOMPANIMENT HANDLERS
export const getAccompanimentsHandler = async (req, res) => {
  try {
    const result = await GET_ACCOMPANIMENTS();
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

export const getAccompanimentHandler = async (req, res) => {
  try {
    const result = await GET_ACCOMPANIMENT_BY_ID(req.params.id);
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

export const addAccompanimentHandler = async (req, res) => {
  try {
    const result = await POST_ACCOMPANIMENT(req.body);
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

export const updateAccompanimentHandler = async (req, res) => {
  try {
    const result = await PATCH_ACCOMPANIMENT({
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

export const deleteAccompanimentHandler = async (req, res) => {
  try {
    const result = await DELETE_ACCOMPANIMENT(req.params.id);
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

// CATEGORY HANDLERS
export const getAccompanimentCategoriesHandler = async (req, res) => {
  try {
    const result = await GET_ACCOMPANIMENT_CATEGORIES();
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

export const getAccompanimentCategoryHandler = async (req, res) => {
  try {
    const result = await GET_ACCOMPANIMENT_CATEGORY_BY_ID(req.params.id);
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

export const addAccompanimentCategoryHandler = async (req, res) => {
  try {
    const result = await POST_ACCOMPANIMENT_CATEGORY(req.body);
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

export const updateAccompanimentCategoryHandler = async (req, res) => {
  try {
    const result = await PATCH_ACCOMPANIMENT_CATEGORY({
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

export const deleteAccompanimentCategoryHandler = async (req, res) => {
  try {
    const result = await DELETE_ACCOMPANIMENT_CATEGORY(req.params.id);
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
