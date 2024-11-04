import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET;
const expireAccess = process.env.ACCESS_TOKEN_EXPIRE_TIME;
const expireRefresh = process.env.REFRESH_TOKEN_EXPIRE_TIME;

export const generateToken = (data) => {
  try {
    return jwt.sign(data, secret, { expiresIn: `${expireAccess}` });
  } catch (err) {
    console.error("[TOKEN_GENERATE] =>", err);
    throw err;
  }
};

export const refreshToken = (data) => {
  try {
    return jwt.sign(data, secret, { expiresIn: `${expireRefresh}` });
  } catch (error) {
    console.error("[TOKEN_REFRESH] =>", error);
    throw error;
  }
};

export const authenticateToken = (req, res, next) => {
  const route = req.path;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  token == null && res.sendStatus(401);

  try {
    jwt.verify(token, secret, (err, authData) => {
      if (err) {
        res.status(403).json({
          data: null,
          error: err,
          message: "احراز هویت شما ناموفق بود",
          ok: false,
        });
      } else if (authData.userType != "admin" && route.startsWith("/admin/")) {
        return res.status(403).json({
          data: null,
          error: "access denied",
          message: "شما مجوز لازم برای انجام این عملیات را ندارید",
          ok: false,
        });
      }
      req.authData = authData;
      next();
    });
  } catch (error) {
    return res.status(400).send("Invalid Token.");
  }
};
