import argon2 from "argon2";
import logger from "../utils/logger.js"; // فرض می‌کنیم این فایل logger شماست

const argon2Options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16, // حدود 64MB حافظه مصرفی
  timeCost: 3, // تعداد دورها
  parallelism: 1,
};

export const generatePasswordHash = async (password) => {
  try {
    return await argon2.hash(password, argon2Options);
  } catch (err) {
    logger.error("[HASH_GENERATE] =>", err);
    throw err;
  }
};

export const comparePasswordHash = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    logger.error("[HASH_VERIFY] =>", err);
    throw err;
  }
};
