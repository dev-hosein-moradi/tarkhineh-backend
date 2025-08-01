import {
  GET_BRANCHES,
  GET_BRANCH_BY_ID,
  CREATE_BRANCH,
  UPDATE_BRANCH,
  TOGGLE_BRANCH_VERIFICATION,
  DELETE_BRANCH,
} from "./branch.action.js";

const handleResponse = (res, result, successStatus = 200) => {
  const response = {
    ok: result.success,
    data: result.data || null,
    total: result.total || undefined,
    totalPages: result.totalPages || undefined,
    currentPage: result.currentPage || undefined,
    message: result.message,
    error: result.error || null,
  };
  res
    .status(
      result.success
        ? successStatus
        : result.error?.code === "P2025"
        ? 404
        : result.error?.code === "DUPLICATE_NAME"
        ? 400
        : result.error?.code === "BRANCH_HAS_USERS"
        ? 400
        : 400
    )
    .json(response);
};

// Get all branches with pagination and search
export const getBranchsHandler = async (req, res) => {
  try {
    // Extract query parameters
    const filters = {
      page: req.query.page,
      limit: req.query.limit,
      sort: req.query.sort,
      order: req.query.order,
      search: req.query.search,
    };

    // Remove undefined values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    console.log("[GET_BRANCHES_FILTERS]:", filters);

    const result = await GET_BRANCHES(filters);
    handleResponse(res, result);
  } catch (error) {
    console.error("[GET_BRANCHES_HANDLER_ERROR]:", error);
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در دریافت شعب",
        error: error.message,
      },
      500
    );
  }
};

// Get single branch
export const getBranchHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await GET_BRANCH_BY_ID(id);
    handleResponse(res, result);
  } catch (error) {
    console.error("[GET_BRANCH_HANDLER_ERROR]:", error);
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در دریافت شعبه",
        error: error.message,
      },
      500
    );
  }
};

// Create branch
export const addBranchsHandler = async (req, res) => {
  try {
    // Input validation
    const requiredFields = [
      "name",
      "title",
      "address",
      "ownerFullName",
      "ownerPhone",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "فیلدهای الزامی مشخص نشده‌اند",
        error: {
          code: "MISSING_FIELDS",
          message: "Missing required fields",
          fields: missingFields,
        },
        data: null,
      });
    }

    const result = await CREATE_BRANCH(req.body);
    handleResponse(res, result, 201);
  } catch (error) {
    console.error("[ADD_BRANCH_HANDLER_ERROR]:", error);
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در ایجاد شعبه",
        error: error.message,
      },
      500
    );
  }
};

// Update branch
export const updateBranchsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UPDATE_BRANCH(id, req.body);
    handleResponse(res, result);
  } catch (error) {
    console.error("[UPDATE_BRANCH_HANDLER_ERROR]:", error);
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در به‌روزرسانی شعبه",
        error: error.message,
      },
      500
    );
  }
};

// Toggle branch verification
export const toggleBranchVerificationHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { verification } = req.body;

    // Input validation
    if (typeof verification !== "boolean") {
      return res.status(400).json({
        ok: false,
        message: "فیلد verification الزامی است و باید boolean باشد",
        error: {
          code: "INVALID_INPUT",
          message: "verification field is required and must be boolean",
        },
        data: null,
      });
    }

    // Get admin info from auth middleware
    const adminId = req.authData?.id;
    const adminRole = req.authData?.userInfo?.role || req.authData?.role;

    const result = await TOGGLE_BRANCH_VERIFICATION(
      id,
      verification,
      adminId,
      adminRole
    );
    handleResponse(res, result);
  } catch (error) {
    console.error("[TOGGLE_VERIFICATION_HANDLER_ERROR]:", error);
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در تغییر وضعیت تایید",
        error: error.message,
      },
      500
    );
  }
};

// Delete branch
export const deleteBranchsHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DELETE_BRANCH(id);
    handleResponse(res, result);
  } catch (error) {
    console.error("[DELETE_BRANCH_HANDLER_ERROR]:", error);
    handleResponse(
      res,
      {
        success: false,
        message: "خطای سرور در حذف شعبه",
        error: error.message,
      },
      500
    );
  }
};
