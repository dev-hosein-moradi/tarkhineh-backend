import { GET, GETBYID, POST, PATCH, DELETE } from "./users.actions.js";

const handleResponse = (res, result, successStatus = 200) => {
  if (result.success) {
    return res.status(successStatus).json({
      data: result.data,
      error: null,
      ok: true,
      message: result.message,
    });
  }
  return res.status(result.error?.code === "P2025" ? 404 : 400).json({
    data: null,
    error: result.error?.message || "خطای عملیات",
    ok: false,
    message: result.message || "عملیات ناموفق",
  });
};

export const getUsersHandler = async (req, res) => {
  try {
    const result = await GET();
    handleResponse(res, result);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور",
    });
  }
};

export const getUserHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور",
    });
  }
};

export const addUserHandler = async (req, res) => {
  try {
    const result = await POST(req.body);
    handleResponse(res, result, 201);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const result = await PATCH({ id: req.params.id, ...req.body });
    handleResponse(res, result);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور",
    });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const result = await DELETE(req.params.id);
    handleResponse(res, result);
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور",
    });
  }
};
