import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;
const expireAccess = process.env.ACCESS_TOKEN_EXPIRE_TIME; // مثل '1h'
const expireRefresh = process.env.REFRESH_TOKEN_EXPIRE_TIME; // مثل '7d'

// تبدیل jwt.verify به Promise برای async/await
export const verifyTokenAsync = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

export const generateToken = async (data) => {
  try {
    const token = await jwt.sign(data, secret, { expiresIn: expireAccess });
    return token;
  } catch (err) {
    console.error("[TOKEN_GENERATE] =>", err);
    throw err;
  }
};

export const refreshToken = async (data) => {
  try {
    const token = await jwt.sign(data, secret, { expiresIn: expireRefresh });
    return token;
  } catch (err) {
    console.error("[TOKEN_REFRESH] =>", err);
    throw err;
  }
};

export const verifyRefreshToken = async (token) => {
  try {
    const decoded = await verifyTokenAsync(token);
    return decoded;
  } catch (err) {
    throw new Error("توکن ریفرش نامعتبر است");
  }
};

// Middleware async برای Express
export const authenticateToken = async (req, res, next) => {
  const route = req.path;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // توکن وجود ندارد
  }

  try {
    const authData = await verifyTokenAsync(token);

    if (authData.userType !== "admin" && route.startsWith("/admin/")) {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    req.authData = authData;
    next();
  } catch (err) {
    return res.status(403).json({
      data: null,
      error: err.message,
      message: "احراز هویت شما ناموفق بود",
      ok: false,
    });
  }
};
