import validator from "validator";

// می‌توانید پکیج `libphonenumber-js` برای موبایل‌های بین‌المللی هم استفاده کنید اگر نیاز بود.

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
// حداقل 8 کاراکتر، حداقل یک حرف کوچک، یک حرف بزرگ، یک عدد و یک کاراکتر ویژه

/**
 * اعتبارسنجی ایمیل با validator
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email = "") => {
  return validator.isEmail(email.trim());
};

/**
 * اعتبارسنجی پسورد با regex قوی‌تر
 * @param {string} password
 * @returns {boolean}
 */
export const validatePassword = (password = "") => {
  return PASSWORD_REGEX.test(password);
};

/**
 * اعتبارسنجی شماره موبایل با validator
 * (تنظیم برای کشور ایران یا بین‌المللی)
 * @param {string} mobileNumber
 * @returns {boolean}
 */
export const validateMobileNumber = (mobileNumber = "") => {
  // برای مثال اعتبارسنجی شماره ایران:
  return validator.isMobilePhone(mobileNumber.trim(), "fa-IR");
  // اگر بخواهید برای کشور دیگه یا بین‌المللی، لیست کشورها موجود است
  // e.g. validator.isMobilePhone(mobileNumber, "any")
};

/**
 * اعتبارسنجی کامل آبجکت کاربر
 * @param {object} user
 * @param {string} user.email
 * @param {string} user.password
 * @param {string} user.mobileNumber
 * @returns {boolean}
 */
export const validateUser = (user = {}) => {
  return (
    validateEmail(user.email) &&
    validatePassword(user.password) &&
    validateMobileNumber(user.mobileNumber)
  );
};
