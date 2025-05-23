import prisma from "../utils/prisma.js";
import { generatePasswordHash, comparePasswordHash } from "../helpers/hash.js";
import { generateToken, refreshToken } from "../utils/jwt.js";

export const registerUser = async (data) => {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { mobileNumber: data.mobile },
    });

    if (existingUser) {
      return {
        success: false,
        message: "این شماره موبایل قبلاً ثبت شده است",
        errors: ["mobile_exists"],
      };
    }

    // Create new user
    const hashedPassword = await generatePasswordHash(data.password);
    const newUser = await prisma.user.create({
      data: {
        mobileNumber: data.mobile,
        password: hashedPassword,
        type: data.type,
      },
      select: {
        id: true,
        mobileNumber: true,
        type: true,
        createdAt: true,
      },
    });

    // Generate tokens
    const tokens = {
      accessToken: generateToken({
        id: newUser.id,
        mobile: newUser.mobileNumber,
        type: newUser.type,
      }),
      refreshToken: refreshToken({
        id: newUser.id,
        mobile: newUser.mobileNumber,
      }),
    };

    return {
      success: true,
      message: "ثبت نام با موفقیت انجام شد",
      tokens,
      userId: newUser.id,
      mobile: newUser.mobileNumber,
      type: newUser.type,
    };
  } catch (error) {
    console.error("[REGISTER_ERROR]:", error);
    return {
      success: false,
      message: "خطا در ثبت نام کاربر",
      errors: ["server_error"],
    };
  }
};

export const loginUser = async (data) => {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { mobileNumber: data.mobile },
      select: {
        id: true,
        mobileNumber: true,
        password: true,
        type: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است",
        errors: ["invalid_credentials"],
      };
    }

    // Verify password
    const isMatch = await comparePasswordHash(user.password, data.password);
    if (!isMatch) {
      return {
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است",
        errors: ["invalid_credentials"],
      };
    }

    // Generate tokens
    const tokens = {
      accessToken: generateAccessToken({
        id: user.id,
        mobile: user.mobileNumber,
        type: user.type,
      }),
      refreshToken: generateRefreshToken({
        id: user.id,
        mobile: user.mobileNumber,
      }),
    };

    return {
      success: true,
      message: "ورود با موفقیت انجام شد",
      tokens,
      userId: user.id,
      mobile: user.mobileNumber,
      type: user.type,
    };
  } catch (error) {
    console.error("[LOGIN_ERROR]:", error);
    return {
      success: false,
      message: "خطا در ورود کاربر",
      errors: ["server_error"],
    };
  }
};
