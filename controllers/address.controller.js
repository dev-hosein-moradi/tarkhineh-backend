import {
  DELETE,
  GET,
  GETBYID,
  GETBYUSER,
  PATCH,
  POST,
} from "./address.action.js";

export const getAddressesHandler = async (req, res) => {
  try {
    const addresses = await GET();
    if (addresses.success) {
      res.status(200).json({
        data: addresses.addresses,
        error: null,
        ok: true,
        message: addresses.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: addresses.error || "خطا در دریافت آدرس‌ها",
        ok: false,
        message: addresses.message || "خطا در دریافت آدرس‌ها",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]", error);
    res.status(500).json({
      data: null,
      error,
      ok: false,
      message: "خطای سرور: لطفا دوباره تلاش کنید",
    });
  }
};

export const getAddressesByUserHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        data: null,
        error: "userId is required",
        ok: false,
        message: "شناسه کاربر الزامی است",
      });
    }
    const addresses = await GETBYUSER(userId);
    if (addresses.success) {
      res.status(200).json({
        data: addresses.addresses,
        error: null,
        ok: true,
        message: addresses.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: addresses.error || "خطا در دریافت آدرس‌ها",
        ok: false,
        message: addresses.message || "خطا در دریافت آدرس‌ها",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETBYUSER]", error);
    res.status(500).json({
      data: null,
      error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getAddressHandler = async (req, res) => {
  try {
    const address = await GETBYID(req.params.id);
    if (address.success && address.address) {
      res.status(200).json({
        data: address.address,
        error: null,
        ok: true,
        message: address.message,
      });
    } else {
      res.status(404).json({
        data: null,
        error: address.error || "آدرس یافت نشد",
        ok: false,
        message: address.message || "آدرس مورد نظر یافت نشد",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GET]", error);
    res.status(500).json({
      data: null,
      error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addAddressHandler = async (req, res) => {
  try {
    const address = await POST(req.body);
    if (address.success) {
      res.status(201).json({
        data: address.newAddress,
        error: null,
        ok: true,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: address.error || "خطا در ثبت آدرس",
        ok: false,
        message: address.message || "خطا در ثبت آدرس",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_POST]", error);
    res.status(500).json({
      data: null,
      error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateAddressHandler = async (req, res) => {
  try {
    if (req.authData?.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const address = await PATCH(req.body);
    if (address.success) {
      res.status(200).json({
        data: address.updated,
        error: null,
        ok: true,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: address.error || "خطا در ویرایش آدرس",
        ok: false,
        message: address.message || "خطا در ویرایش آدرس",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_PATCH]", error);
    res.status(500).json({
      data: null,
      error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteAddressHandler = async (req, res) => {
  try {
    if (req.authData?.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "access denied",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const address = await DELETE(req.params.id);
    if (address.success) {
      res.status(200).json({
        data: address.deleted,
        error: null,
        ok: true,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: address.error || "خطا در حذف آدرس",
        ok: false,
        message: address.message || "خطا در حذف آدرس",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_DELETE]", error);
    res.status(500).json({
      data: null,
      error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
