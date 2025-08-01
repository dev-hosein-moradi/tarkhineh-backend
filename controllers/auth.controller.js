import { registerUser, loginUser } from "./auth.action.js";
import { validationResult } from "express-validator";
import { verifyRefreshToken, generateToken } from "../utils/jwt.js";
import { verifyTokenOnly } from "../middleware/verify.middleware.js";
import prisma from "../utils/prisma.js";

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

    // Set refresh token cookie
    res.cookie("refreshToken", result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      domain:
        process.env.NODE_ENV === "production"
          ? "tarkhineh.hosseinmoradi.ir"
          : "localhost",
    });

    return res.status(201).json({
      ok: true,
      message: result.message,
      data: {
        token: result.tokens.accessToken,
        userId: result.userId,
        mobile: result.mobile,
        userInfo: {
          type: result.type,
          role: result.role,
        },
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
      // Set access token cookie
      res.cookie("authToken", result.tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        domain:
          process.env.NODE_ENV === "production"
            ? "tarkhineh.hosseinmoradi.ir"
            : "localhost",
      });

      // Set refresh token cookie
      res.cookie("refreshToken", result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
          userInfo: {
            type: result.type,
            role: result.role,
          },
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
    // Clear both tokens
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      domain:
        process.env.NODE_ENV === "production"
          ? "tarkhineh.hosseinmoradi.ir"
          : "localhost",
    });

    res.clearCookie("refreshToken", {
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

    const userData = await verifyRefreshToken(refreshToken);

    // Get updated user info
    const user = await prisma.user.findUnique({
      where: { id: userData.id },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
      },
    });

    const newAccessToken = await generateToken({
      id: user.id,
      mobile: user.mobileNumber,
      userInfo: {
        type: user.type,
        role: user.role,
        branchId: user.branchId,
        branch: user.branch,
        permissions: user.permissions,
      },
    });

    return res.status(200).json({
      ok: true,
      data: {
        token: newAccessToken,
        userInfo: {
          type: user.type,
          role: user.role,
        },
      },
      message: "توکن جدید صادر شد.",
    });
  } catch (error) {
    console.error("[AUTH_REFRESH_TOKEN HANDLER ERROR]:", error);
    next(error);
  }
};

// Add this handler to your existing auth.controller.js
export const verifyTokenHandler = async (req, res, next) => {
  // First verify token without auto-refresh
  verifyTokenOnly(req, res, async () => {
    try {
      const userId = req.authData?.id;

      if (!userId) {
        return res.status(403).json({
          ok: false,
          message: "شناسه کاربر در توکن یافت نشد.",
          error: "invalid_token_payload",
          code: "invalid_token",
          data: null,
        });
      }

      // Check if user still exists and is active
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          mobileNumber: true,
          type: true,
          role: true,
          branchId: true,
          isActive: true,
          branch: {
            select: {
              id: true,
              name: true,
              title: true,
            },
          },
          permissions: {
            select: {
              permission: true,
              branchId: true,
              branch: {
                select: {
                  id: true,
                  name: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      if (!user) {
        return res.status(403).json({
          ok: false,
          message: "کاربر یافت نشد.",
          error: "user_not_found",
          code: "user_not_found",
          data: null,
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          ok: false,
          message: "حساب کاربری غیرفعال است.",
          error: "user_inactive",
          code: "user_inactive",
          data: null,
        });
      }

      // Get token expiry info
      const tokenExp = req.authData.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = tokenExp - currentTime;

      return res.status(200).json({
        ok: true,
        message: "توکن معتبر است.",
        data: {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            userInfo: {
              type: user.type,
              role: user.role,
              branchId: user.branchId,
              branch: user.branch,
              permissions: user.permissions,
            },
            isActive: user.isActive,
          },
          token: {
            expiresAt: tokenExp,
            expiresIn: timeUntilExpiry,
            isValid: timeUntilExpiry > 0,
          },
        },
        error: null,
      });
    } catch (error) {
      console.error("[VERIFY_TOKEN_HANDLER_ERROR]:", error);
      return res.status(500).json({
        ok: false,
        message: "خطای سرور در تایید توکن.",
        error: "server_error",
        code: "server_error",
        data: null,
      });
    }
  });
};
