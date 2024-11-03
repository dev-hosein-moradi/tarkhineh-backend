import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./address.action.js";

export const getAddressesHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const addresses = await GET();
    // if (reqId) {
    //   cache.set(reqId, addresses);
    // }

    res.status(200).json({
      data: addresses,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get addresses",
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

    res.status(200).json({
      data: address,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get address",
    });
  }
};

export const addAddressHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const address = await POST(req.body);
    res.status(200).json({
      data: address,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get address",
    });
  }
};

export const updateAddressHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const address = await PATCH(req.body);
    res.status(200).json({
      data: address,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get address",
    });
  }
};

export const deleteAddressHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const address = await DELETE(req.body);
    res.status(200).json({
      data: address,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[ADDRESS_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get address",
    });
  }
};
