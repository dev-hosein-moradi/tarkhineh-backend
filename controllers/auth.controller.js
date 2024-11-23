import { refreshToken } from "../utils/jwt.js";
import { loginUser, registerUser } from "./auth.action.js";

export const registerUserHandler = async (req, res) => {
  try {
    const token = await registerUser(
      req?.body?.mobile,
      req?.body?.password,
      req?.body?.__t
    );
    console.log("pass is " + req?.body?.password);
    if (token.success) {
      res
        .status(200)
        .setHeader("Authorization", `Bearer ${token}`)
        .json({
          data: {
            token: token.token,
            userId: token.userId,
            mobile: token.mobile,
          },
          error: token.error,
          ok: token.success,
          message: token.message,
        });
    } else {
      res.status(400).json({
        data: null,
        error: null,
        ok: false,
        message: token.message,
      });
    }
  } catch (error) {
    console.error("[AUTH_REGISTER]=> " + error);
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const loginUserHandler = async (req, res) => {
  try {
    const user = await loginUser(req?.body?.mobile, req?.body?.password);
    if (user.success) {
      res
        .cookie(
          "refreshToken",
          refreshToken({
            id: user.token.id,
            email: user.token.email,
            mobileNumber: user.token.mobileNumber,
            userType: user.token.__t,
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
          }
        )
        .setHeader("Authorization", `Bearer ${user.token}`)
        .status(200)
        .json({
          data: {
            token: user.token,
            userId: user.userId,
            mobile: user.mobile,
          },
          error: user.error,
          ok: user.success,
          message: user.message,
        });
    } else {
      res.status(400).json({
        data: null,
        error: null,
        ok: false,
        message: "رمز عبور یا نام کاربری اشتباه است",
      });
    }
  } catch (error) {
    console.error("[AUTH_LOGIN]=> " + error);
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const logoutUserHandler = async (req, res) => {
  try {
    res
      .cookie("refreshToken", "", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
      })
      .status(200)
      .json({
        data: null,
        error: false,
        ok: false,
        message: "Logged out successfully",
      });
  } catch (error) {
    console.error("[AUTH_LOGOUT]=> " + error);
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
