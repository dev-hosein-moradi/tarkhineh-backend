import { z } from "zod";

const iranianMobileRegex = /^09[0-9]{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

export const registerSchema = z.object({
  mobile: z.string().regex(iranianMobileRegex, {
    message: "شماره موبایل معتبر نیست (مثال: 09123456789)",
  }),
  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" })
    .regex(passwordRegex, {
      message: "رمز عبور باید شامل حروف بزرگ، کوچک و اعداد باشد",
    }),
  type: z.enum(["user", "admin"]).default("user"),
});

export const loginSchema = z.object({
  mobile: z.string(),
  password: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});
