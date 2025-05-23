import { verifyTokenAsync } from "../utils/jwt.js";
import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";
const { TokenExpiredError, JsonWebTokenError } = jwt;

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "توکن احراز هویت ارائه نشده است",
    });
  }

  try {
    req.authData = await verifyTokenAsync(token);
    next();
  } catch (err) {
    return res.status(403).json({
      ok: false,
      message: "توکن نامعتبر یا منقضی شده است",
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    // Assuming your JWT stores role
    return res.status(403).json({
      ok: false,
      message: "دسترسی محدود به مدیران سیستم",
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
