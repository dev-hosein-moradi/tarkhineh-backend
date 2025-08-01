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
        message: "کاربری با این شماره موبایل قبلاً ثبت نام کرده است",
        errors: ["user_exists"],
      };
    }

    // Create new user
    const hashedPassword = await generatePasswordHash(data.password);
    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        mobileNumber: data.mobile,
        password: hashedPassword,
        type: data.type || "user",
        role: data.role || "customer",
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
      },
    });

    // Generate tokens with userInfo object
    const tokens = {
      accessToken: await generateToken({
        id: newUser.id,
        mobile: newUser.mobileNumber,
        userInfo: {
          type: newUser.type,
          role: newUser.role,
          branchId: newUser.branchId,
          branch: newUser.branch,
        },
      }),
      refreshToken: await refreshToken({
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
      role: newUser.role,
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

export const loginUser = async (mobile, password) => {
  try {
    const user = await prisma.user.findUnique({
      where: { mobileNumber: mobile },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
            title: true,
          },
        },
        permissions: {
          include: {
            branch: {
              select: {
                id: true,
                name: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است",
        errors: ["invalid_credentials"],
      };
    }

    const isValidPass = await comparePasswordHash(user.password, password);
    if (!isValidPass) {
      return {
        success: false,
        message: "نام کاربری یا رمز عبور اشتباه است",
        errors: ["invalid_credentials"],
      };
    }

    // Generate tokens with userInfo object
    const tokens = {
      accessToken: await generateToken({
        id: user.id,
        mobile: user.mobileNumber,
        userInfo: {
          type: user.type,
          role: user.role,
          branchId: user.branchId,
          branch: user.branch,
          permissions: user.permissions,
        },
      }),
      refreshToken: await refreshToken({
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
      role: user.role,
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
