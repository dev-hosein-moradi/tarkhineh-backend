import { DELETE, GET, GETBYID, PATCH, POST } from "./users.actions.js";

export const getUsersHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const users = await GET();
    if (users.success) {
      res.status(200).json({
        data: users.users,
        error: users.error,
        ok: users.success,
        message: users.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت کاربران مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }
    const user = await GETBYID(req.params.id);

    if (user.success) {
      res.status(200).json({
        data: user.user,
        error: user.error,
        ok: user.success,
        message: user.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت کاربر مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const user = await POST(req.body);

    if (user.success) {
      res.status(200).json({
        data: user.newUser,
        error: user.errorl,
        ok: user.success,
        message: user.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ایجاد کاربر مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const user = await PATCH(req.body);

    if (user.success) {
      res.status(200).json({
        data: user.updated,
        error: user.error,
        ok: user.success,
        message: user.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش کاربر مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const user = await DELETE(req.body);

    if (user.success) {
      res.status(200).json({
        data: user.deleted,
        error: user.error,
        ok: user.success,
        message: user.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در حذف کاربر مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
