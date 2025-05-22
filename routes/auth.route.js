import { Router } from "express";
import {
  loginUserHandler,
  registerUserHandler,
  logoutUserHandler,
  refreshTokenHandler,
} from "../controllers/auth.controller.js";

import { body } from "express-validator";

const authRouter = Router();

authRouter.post(
  "/register",
  [
    body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل معتبر نیست."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("رمز عبور حداقل ۸ کاراکتر باشد.")
      .matches(/[A-Z]/)
      .withMessage("رمز عبور باید حاوی حداقل یک حرف بزرگ باشد.")
      .matches(/[a-z]/)
      .withMessage("رمز عبور باید حاوی حداقل یک حرف کوچک باشد.")
      .matches(/\d/)
      .withMessage("رمز عبور باید حاوی حداقل یک عدد باشد."),
    body("type").optional().isIn(["user", "admin"]).withMessage("نوع کاربر نامعتبر است."),
  ],
  registerUserHandler
);

authRouter.post(
  "/login",
  [
    body("mobile").isMobilePhone("fa-IR").withMessage("شماره موبایل معتبر نیست."),
    body("password").notEmpty().withMessage("رمز عبور نمی‌تواند خالی باشد."),
  ],
  loginUserHandler
);

authRouter.post("/logout", logoutUserHandler);

authRouter.post("/refresh-token", refreshTokenHandler);

export default (app) => {
  app.use("/auth", authRouter);
};
