// Create a new file: middleware/verify.middleware.js
import { verifyTokenAsync } from "../utils/jwt.js";
import prisma from "../utils/prisma.js";
import jwt from "jsonwebtoken";
const { TokenExpiredError, JsonWebTokenError } = jwt;

export const verifyTokenOnly = async (req, res, next) => {
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
      code: "token_missing",
      data: null,
    });
  }

  try {
    const decoded = await verifyTokenAsync(token);
    req.authData = decoded;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({
        ok: false,
        message: "توکن منقضی شده است.",
        error: "token_expired",
        code: "TOKEN_EXPIRED",
        data: null,
      });
    }

    console.error("[TOKEN_VERIFY_ERROR]:", err);
    return res.status(403).json({
      ok: false,
      message: "توکن نامعتبر است.",
      error: "invalid_token",
      code: "invalid_token",
      data: null,
    });
  }
};
