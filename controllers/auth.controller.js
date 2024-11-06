import { refreshToken } from "../utils/jwt.js";
import { loginUser, registerUser } from "./auth.action.js";

export const registerUserHandler = async (req, res) => {
  try {
    const token = await registerUser(req?.body?.mobile, req?.body?.password);

    if (token.success) {
      res.status(200).setHeader("Authorization", `Bearer ${token}`).json({
        data: token.token,
        error: token.error,
        ok: token.success,
        message: token.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: null,
        ok: false,
        message: "در ثبت نام کاربر مشکلی پیش آمده است",
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
    const user = await loginUser(
      req?.body?.data.mobile,
      req?.body?.data.password
    );

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
            sameSite: "strict",
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
        message: "در ورود کاربر مشکلی پیش آمده است",
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
