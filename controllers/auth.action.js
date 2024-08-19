import models from "../models/index.js";
import {
  validateMobileNumber,
  validatePassword,
  validateUser,
} from "../utils/validator.js";
import { comparePasswordHash, generatePasswordHash } from "../helpers/hash.js";
import { generateToken } from "../utils/jwt.js";
import { v4 } from "uuid";

const { UserModel } = models;

export const registerUser = async (
  mobile = "",
  password = "",
  type = "user"
) => {
  try {
    if (validateMobileNumber(mobile) && validatePassword(password)) {
      const existingUser = await UserModel.findOne({
        mobileNumber: mobile,
      });

      if (!existingUser) {
        let model;
        switch (type) {
          case "user":
            model = UserModel;
            break;
          default:
            break;
        }

        // create user
        const newUser = new model({
          mobileNumber: mobile,
          password: await generatePasswordHash(password),
          id: v4(),
        });

        await newUser.save();

        const token = generateToken({
          id: newUser.id,
          email: newUser.email,
          mobileNumber: newUser.mobileNumber,
          userType: newUser.__t,
        });
        console.log("tokennn => " + token);

        return token;
      }
      console.error("invalid register user data, already exist" + existingUser);
      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("[AUTH_ACTION_REGISTER]=> " + error);
  }
};

export const loginUser = async (mobile, password) => {
  try {
    if (validateMobileNumber(mobile) && validatePassword(password)) {
      const entity = await UserModel.findOne({ mobileNumber: mobile });

      if (await comparePasswordHash(entity.password, password)) {
        const token = generateToken({
          id: entity.id,
          email: entity.email,
          mobileNumber: entity.mobileNumber,
          userType: entity.__t,
        });

        return token;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("[AUTH_ACTION_LOGIN]=> " + error);
  }
};
