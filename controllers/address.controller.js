import { cache } from "../helpers/cache.js";
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
    const { reqId } = req.body;
    const addresses = await GET();
    // if (reqId) {
    //   cache.set(reqId, addresses);
    // }
    if (addresses.addresses) {
      res.status(200).json({
        data: addresses.addresses,
        error: addresses.error,
        ok: addresses.success,
        message: addresses.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت آدرس ها مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getAddressesByUserHandler = async (req, res) => {
  try {
    const { userId } = req.query;

    const addresses = await GETBYUSER(userId);
    // if (reqId) {
    //   cache.set(reqId, addresses);
    // }
    if (addresses.addresses) {
      res.status(200).json({
        data: addresses.addresses,
        error: addresses.error,
        ok: addresses.success,
        message: addresses.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت آدرس ها مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const getAddressHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const address = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, address);
    // }
    if (address.success) {
      res.status(200).json({
        data: address.address,
        error: address.error,
        ok: address.success,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در دریافت آدرس مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const addAddressHandler = async (req, res) => {
  try {
    // if (req.authData.userType !== "admin") {
    //   console.log("here 2");
    //   return res.status(403).json({
    //     data: null,
    //     error: "access denied",
    //     message: "شما مجوز لازم برای انجام این عملیات را ندارید",
    //     ok: false,
    //   });
    // }
    const address = await POST(req.body);
    if (address.success) {
      res.status(200).json({
        data: address.newAddress,
        error: address.error,
        ok: address.success,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ایجاد آدرس مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const updateAddressHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
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
        error: address.error,
        ok: address.success,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در ویرایش آدرس مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};

export const deleteAddressHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
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
        error: address.error,
        ok: address.success,
        message: address.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: "error",
        ok: false,
        message: "در حذف آدرس مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
