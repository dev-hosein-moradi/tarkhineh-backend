import {
  verifyTokenAsync,
  verifyRefreshToken,
  generateToken,
} from "../utils/jwt.js";
import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";
const { TokenExpiredError, JsonWebTokenError } = jwt;

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // Also check cookie if no Authorization header
  if (!token) {
    token = req.cookies.authToken;
  }

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "توکن احراز هویت ارسال نشده است.",
      error: "token_missing",
    });
  }

  try {
    const decoded = await verifyTokenAsync(token);
    req.authData = decoded;

    // For backward compatibility
    req.authData.type = decoded.userInfo?.type || decoded.type;
    req.authData.role = decoded.userInfo?.role || decoded.role;
    req.authData.userType = decoded.userInfo?.type || decoded.userType;

    next();
  } catch (err) {
    // If access token is expired, try to refresh
    if (err instanceof TokenExpiredError) {
      try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
          return res.status(401).json({
            ok: false,
            message: "توکن منقضی شده و ریفرش توکن موجود نیست.",
            error: "refresh_token_missing",
            code: "TOKEN_EXPIRED",
          });
        }

        // Verify refresh token and get user data
        const refreshData = await verifyRefreshToken(refreshToken);

        // Get updated user info
        const user = await prisma.user.findUnique({
          where: { id: refreshData.id },
          include: {
            branch: {
              select: { id: true, name: true, title: true },
            },
            permissions: {
              include: {
                branch: {
                  select: { id: true, name: true, title: true },
                },
              },
            },
          },
        });

        if (!user || !user.isActive) {
          return res.status(401).json({
            ok: false,
            message: "کاربر یافت نشد یا غیرفعال است.",
            error: "user_not_found",
          });
        }

        // Generate new access token
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

        // Set new token in cookie
        res.cookie("authToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          domain:
            process.env.NODE_ENV === "production"
              ? "tarkhineh.hosseinmoradi.ir"
              : "localhost",
        });

        // Set refreshed token data
        req.authData = {
          id: user.id,
          mobile: user.mobileNumber,
          userInfo: {
            type: user.type,
            role: user.role,
            branchId: user.branchId,
            branch: user.branch,
            permissions: user.permissions,
          },
          type: user.type,
          role: user.role,
          userType: user.type,
        };

        // Add header to indicate token was refreshed
        res.set("X-Token-Refreshed", "true");
        res.set("X-New-Token", newAccessToken);

        next();
      } catch (refreshErr) {
        console.error("[REFRESH_TOKEN_ERROR]:", refreshErr);
        return res.status(401).json({
          ok: false,
          message: "ریفرش توکن نامعتبر است. لطفا مجدداً وارد شوید.",
          error: "invalid_refresh_token",
          code: "REFRESH_FAILED",
        });
      }
    } else {
      console.error("[TOKEN_VERIFY_ERROR]:", err);
      return res.status(403).json({
        ok: false,
        message: "توکن نامعتبر است.",
        error: "invalid_token",
      });
    }
  }
};

export const requireAdmin = (req, res, next) => {
  const role = req.authData?.type || req.authData?.userType;

  if (role !== "admin") {
    return res.status(403).json({
      ok: false,
      message: "دسترسی فقط برای مدیران مجاز است.",
      error: "access_denied",
      data: null,
    });
  }
  next();
};

export const authenticate = async (req, res, next) => {
  try {
    // 1. Get token from headers or cookies
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "دسترسی غیرمجاز - توکن ارائه نشده است",
      });
    }

    // 2. Verify token
    const decoded = verifyTokenAsync(token);

    // 3. Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        mobileNumber: true,
        type: true,
        isActive: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "حساب کاربری یافت نشد",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        ok: false,
        message: "حساب کاربری غیرفعال شده است",
      });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("[AUTHENTICATE_MIDDLEWARE_ERROR]:", error);

    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        ok: false,
        message: "توکن منقضی شده است",
        code: "TOKEN_EXPIRED",
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({
        ok: false,
        message: "توکن نامعتبر است",
        code: "INVALID_TOKEN",
      });
    }

    return res.status(500).json({
      ok: false,
      message: "خطای سرور در احراز هویت",
    });
  }
};
