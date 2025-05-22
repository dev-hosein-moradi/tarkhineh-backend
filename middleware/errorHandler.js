import logger from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  // لاگ کردن خطا
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;
  const response = {
    ok: false,
    message: err.message || "خطای داخلی سرور",
  };

  // در حالت توسعه، خطا را کامل‌تر بفرست
  if (process.env.NODE_ENV === "development") {
    response.error = err.error || err.stack || null;
  }

  res.status(statusCode).json(response);
};
