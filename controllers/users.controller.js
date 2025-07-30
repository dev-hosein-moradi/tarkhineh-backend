import {
  GET,
  GETBYID,
  POST,
  PATCH,
  DELETE,
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
    const result = await GET_USERS_WITH_ROLES();
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
