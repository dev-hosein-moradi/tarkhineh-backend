import prisma from "../utils/prisma.js";
import { validateMobileNumber, validatePassword } from "../utils/validator.js";
import { comparePasswordHash, generatePasswordHash } from "../helpers/hash.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (
  mobile = "",
  password = "",
  type = "user"
) => {
  try {
    if (!validateMobileNumber(mobile)) {
      return { success: false, message: "شماره موبایل وارد شده معتبر نیست." };
    }

    if (!validatePassword(password)) {
      return {
        success: false,
        message:
          "رمز عبور باید حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک و عدد باشد.",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { mobileNumber: mobile },
    });
    if (existingUser) {
      return { success: false, message: "این شماره موبایل قبلاً ثبت شده است." };
    }

    const hashedPassword = await generatePasswordHash(password);

    const newUser = await prisma.user.create({
      data: {
        mobileNumber: mobile,
        password: hashedPassword,
        type,
      },
    });

    const token = generateToken({
      id: newUser.id,
      mobileNumber: newUser.mobileNumber,
      userType: newUser.type,
    });

    return {
      success: true,
      message: "ثبت نام با موفقیت انجام شد.",
      token,
      userId: newUser.id,
      mobile: newUser.mobileNumber,
      error: null,
    };
  } catch (error) {
    console.error("[AUTH_ACTION_REGISTER ERROR]:", error);
    return {
      success: false,
      message:
        "خطایی در هنگام ثبت نام رخ داده است. لطفاً بعداً دوباره تلاش کنید.",
      error: error.message || error,
    };
  }
};

export const loginUser = async (mobile, password) => {
  try {
    if (!validateMobileNumber(mobile)) {
      return { success: false, message: "شماره موبایل وارد شده معتبر نیست." };
    }

    if (!validatePassword(password)) {
      return { success: false, message: "رمز عبور وارد شده معتبر نیست." };
    }

    const user = await prisma.user.findUnique({
      where: { mobileNumber: mobile },
    });
    if (!user) {
      return { success: false, message: "نام کاربری یا رمز عبور اشتباه است." };
    }

    const isMatch = await comparePasswordHash(user.password, password);
    if (!isMatch) {
      return { success: false, message: "نام کاربری یا رمز عبور اشتباه است." };
    }

    const token = generateToken({
      id: user.id,
      mobileNumber: user.mobileNumber,
      userType: user.type,
    });

    return {
      success: true,
      message: "ورود با موفقیت انجام شد.",
      token,
      userId: user.id,
      mobile: user.mobileNumber,
      error: null,
    };
  } catch (error) {
    console.error("[AUTH_ACTION_LOGIN ERROR]:", error);
    return {
      success: false,
      message: "خطایی در هنگام ورود رخ داده است. لطفاً بعداً دوباره تلاش کنید.",
      error: error.message || error,
    };
  }
};
