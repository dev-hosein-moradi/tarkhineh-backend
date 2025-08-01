import {
  GET,
  GETBYID,
  POST,
  PATCH,
  DELETE,
  UPDATE_USER_STATUS, // Add this import
  ASSIGN_USER_ROLE,
  ASSIGN_USER_PERMISSIONS,
  GET_USERS_WITH_ROLES,
  ADD_USER_PERMISSIONS,
  REPLACE_USER_PERMISSIONS,
  REMOVE_USER_PERMISSIONS,
} from "./users.actions.js";

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
        : 400
    )
    .json(response);
};

// Existing handlers
export const getUsersHandler = async (req, res) => {
  try {
    // Extract all query parameters
    const filters = {
      // Pagination
      page: req.query.page,
      limit: req.query.limit,

      // Sorting
      sort: req.query.sort,
      order: req.query.order,

      // Search
      search: req.query.search,

      // Filters
      type: req.query.type,
      role: req.query.role,
      excludeRole: req.query.excludeRole,
    };

    // Remove undefined values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    console.log("[GET_USERS_FILTERS]:", filters);

    const result = await GET(filters);
    handleResponse(res, result);
  } catch (error) {
    console.error("[GET_USERS_HANDLER_ERROR]:", error);
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

export const getUserHandler = async (req, res) => {
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

export const addUserHandler = async (req, res) => {
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

export const updateUserHandler = async (req, res) => {
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

export const deleteUserHandler = async (req, res) => {
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

// New permission management handlers
export const getUserPermissionsHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.id);
    if (!result.success) {
      return handleResponse(res, result);
    }

    // Extract permissions from user data
    const permissionsResult = {
      success: true,
      data: result.data.permissions || [],
      message: "User permissions retrieved successfully",
    };

    handleResponse(res, permissionsResult);
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

export const assignUserPermissionsHandler = async (req, res) => {
  try {
    const result = await ADD_USER_PERMISSIONS({
      userId: req.params.id,
      permissions: req.body.permissions,
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

export const replaceUserPermissionsHandler = async (req, res) => {
  try {
    const result = await REPLACE_USER_PERMISSIONS({
      userId: req.params.id,
      permissions: req.body.permissions,
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

export const removeUserPermissionsHandler = async (req, res) => {
  try {
    const result = await REMOVE_USER_PERMISSIONS({
      userId: req.params.id,
      permissions: req.body.permissions, // Optional: specific permissions to remove
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

export const assignUserRoleHandler = async (req, res) => {
  try {
    const result = await ASSIGN_USER_ROLE({
      userId: req.params.id,
      role: req.body.role,
      branchId: req.body.branchId,
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

export const getUsersWithRolesHandler = async (req, res) => {
  try {
    // Extract all query parameters
    const filters = {
      // Pagination
      page: req.query.page,
      limit: req.query.limit,

      // Sorting
      sort: req.query.sort,
      order: req.query.order,

      // Search
      search: req.query.search,

      // Filters
      type: req.query.type,
      role: req.query.role,
      excludeRole: req.query.excludeRole,
    };

    // Remove undefined values
    Object.keys(filters).forEach((key) => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    console.log("[GET_USERS_WITH_ROLES_FILTERS]:", filters);

    const result = await GET_USERS_WITH_ROLES(filters);
    handleResponse(res, result);
  } catch (error) {
    console.error("[GET_USERS_WITH_ROLES_HANDLER_ERROR]:", error);
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

export const updateUserStatusHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isActive } = req.body;

    // Input validation
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        ok: false,
        message: "فیلد isActive الزامی است و باید boolean باشد",
        error: {
          code: "INVALID_INPUT",
          message: "isActive field is required and must be boolean",
        },
        data: null,
      });
    }

    if (!userId) {
      return res.status(400).json({
        ok: false,
        message: "شناسه کاربر الزامی است",
        error: {
          code: "MISSING_USER_ID",
          message: "User ID is required",
        },
        data: null,
      });
    }

    // Get current user info from auth middleware
    const currentUserId = req.authData?.id;
    const currentUserRole = req.authData?.userInfo?.role || req.authData?.role;

    if (!currentUserId || !currentUserRole) {
      return res.status(401).json({
        ok: false,
        message: "اطلاعات احراز هویت نامعتبر است",
        error: {
          code: "INVALID_AUTH",
          message: "Invalid authentication data",
        },
        data: null,
      });
    }

    const result = await UPDATE_USER_STATUS({
      userId,
      isActive,
      currentUserId,
      currentUserRole,
    });

    if (result.success) {
      return res.status(200).json({
        ok: true,
        data: result.data,
        message: result.message,
        error: null,
      });
    } else {
      // Handle specific error codes
      let statusCode = 400;
      if (result.error?.code === "P2025") {
        statusCode = 404;
      } else if (result.error?.code === "INSUFFICIENT_PERMISSION") {
        statusCode = 403;
      } else if (result.error?.code === "SELF_DEACTIVATION") {
        statusCode = 400;
      }

      return res.status(statusCode).json({
        ok: false,
        message: result.message,
        error: result.error,
        data: null,
      });
    }
  } catch (error) {
    console.error("[UPDATE_USER_STATUS_HANDLER_ERROR]:", error);
    return res.status(500).json({
      ok: false,
      message: "خطای سرور در تغییر وضعیت کاربر",
      error: {
        code: "SERVER_ERROR",
        message: "Internal server error",
      },
      data: null,
    });
  }
};
