import { DELETE, GET, GETBYID, PATCH } from "./users.actions.js";

export const getUsersHandler = async (req, res) => {
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

    const users = await GET();

    res.status(200).json({
      data: users,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get users",
    });
  }
};

export const getUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }
    const user = await GETBYID(req.params.id);

    res.status(200).json({
      data: user,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get user",
    });
  }
};

export const addUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const user = await POST(req.body);

    res.status(200).json({
      data: user,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in add user",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const user = await PATCH(req.body);

    res.status(200).json({
      data: user,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in update user",
    });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const user = await DELETE(req.body);

    res.status(200).json({
      data: user,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in delete user",
    });
  }
};
