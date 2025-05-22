import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 100, // هر آی‌پی حداکثر 100 درخواست در بازه زمانی
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logger.warn(`IP ${req.ip} blocked by rate limiter.`);
    res.status(options.statusCode).json({
      ok: false,
      message: "تعداد درخواست‌های شما بیش از حد مجاز است، لطفا بعدا تلاش کنید.",
    });
  },
});
