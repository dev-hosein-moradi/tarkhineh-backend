import { refreshToken } from "../utils/jwt.js";
import { loginUser, registerUser } from "./auth.action.js";

export const registerUserHandler = async (req, res) => {
  try {
    const token = await registerUser(req?.body?.mobile, req?.body?.password);

    if (token) {
      res.status(200).setHeader("Authorization", `Bearer ${token}`).json({
        data: token,
        status: 200,
        error: null,
        ok: true,
        message: "successfuly register",
      });
    } else {
      res.status(400).json({
        data: token,
        status: 400,
        error: "invalid data",
        ok: false,
        message: "error in register",
      });
    }
  } catch (error) {
    console.error("[AUTH_REGISTER]=> " + error);
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in register",
    });
  }
};

export const loginUserHandler = async (req, res) => {
  try {
    const user = await loginUser(req?.body?.mobile, req?.body?.password);

    if (user) {
      res
        .cookie(
          "refreshToken",
          refreshToken({
            id: user.id,
            email: user.email,
            mobileNumber: user.mobileNumber,
            userType: user.__t,
          }),
          {
            httpOnly: true,
            sameSite: "strict",
          }
        )
        .setHeader("Authorization", `Bearer ${user}`)
        .status(200)
        .json({
          data: user,
          status: 200,
          error: null,
          ok: true,
          message: "successfully login",
        });
    } else {
      res.status(400).json({
        data: null,
        status: 400,
        error: "invalid data",
        ok: false,
        message: "invalid data",
      });
    }
  } catch (error) {
    console.error("[AUTH_LOGIN]=> " + error);
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in login",
    });
  }
};
