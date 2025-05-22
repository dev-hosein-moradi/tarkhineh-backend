import { NextFunction, Request, Response } from "express";

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        const formattedErrors = result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          ok: false,
          message: "خطا در اعتبارسنجی داده‌ها",
          errors: formattedErrors,
        });
      }

      req.validatedData = result.data;
      next();
    } catch (error) {
      console.error("[VALIDATION_ERROR]:", error);
      return res.status(500).json({
        ok: false,
        message: "خطای سرور در اعتبارسنجی داده‌ها",
      });
    }
  };
};
