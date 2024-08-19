import argon2 from "argon2";

export const generatePasswordHash = async (password) => {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
    });
  } catch (err) {
    console.error("[HASH_GENERATE] =>", err);
    throw err;
  }
};

export const comparePasswordHash = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    console.error("[HASH_VERIFY] =>", err);
    throw err;
  }
};
