import { registerUser, loginUser } from "./auth.action.js";
import { validationResult } from "express-validator";
import { verifyRefreshToken, generateToken } from "../utils/jwt.js";

const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: "خطا در ورودی‌ها",
      errors: errors.array().map((err) => err.msg),
    });
  }
  return null;
};

export const registerUserHandler = async (req, res) => {
  try {
    const result = await registerUser(req.validatedData);

    if (!result.success) {
      return res.status(400).json({
        ok: false,
        message: result.message,
        errors: result.errors,
      });
    }

    return res.status(201).json({
      ok: true,
      message: result.message,
      data: {
        userId: result.userId,
        mobile: result.mobile,
        type: result.type,
      },
    });
  } catch (error) {
    console.error("[REGISTER_ERROR]:", error);
    return res.status(500).json({
      ok: false,
      message: "خطای سرور در ثبت نام",
    });
  }
};

export const loginUserHandler = async (req, res, next) => {
  try {
    const validationErrorResponse = handleValidationErrors(req, res);
    if (validationErrorResponse) return validationErrorResponse;

    const { mobile, password } = req.body;
    const result = await loginUser(mobile, password);

    if (result.success) {
      res.cookie("authToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
        domain:
          process.env.NODE_ENV === "production"
            ? "tarkhineh.hosseinmoradi.ir"
            : "localhost",
      });

      return res.status(200).json({
        ok: true,
        message: result.message,
        data: {
          token: result.tokens.accessToken,
          userId: result.userId,
          mobile: result.mobile,
          type: result.type,
          role: result.role, // Add role to response
        },
        error: null,
      });
    }

    return res.status(401).json({
      ok: false,
      message: result.message || "نام کاربری یا رمز عبور اشتباه است.",
      data: null,
      error: result.error || null,
    });
  } catch (error) {
    console.error("[AUTH_LOGIN HANDLER ERROR]:", error);
    next(error);
  }
};

export const logoutUserHandler = async (req, res, next) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      domain:
        process.env.NODE_ENV === "production"
          ? "tarkhineh.hosseinmoradi.ir"
          : "localhost",
    });

    return res.status(200).json({
      ok: true,
      message: "خروج با موفقیت انجام شد.",
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("[AUTH_LOGOUT HANDLER ERROR]:", error);
    next(error);
  }
};

export const refreshTokenHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        ok: false,
        message: "توکن ریفرش ارسال نشده است.",
      });
    }

    const userData = verifyRefreshToken(refreshToken);

    const newAccessToken = generateToken({
      id: userData.id,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
      userType: userData.userType,
    });

    return res.status(200).json({
      ok: true,
      token: newAccessToken,
      message: "توکن جدید صادر شد.",
    });
  } catch (error) {
    console.error("[AUTH_REFRESH_TOKEN HANDLER ERROR]:", error);
    next(error);
  }
};
