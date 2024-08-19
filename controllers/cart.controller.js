import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH, POST } from "./cart.action.js";

export const getCartsHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const carts = await GET();
    cache.set(reqId, carts);

    res.status(200).json({
      data: carts,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CART_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get carts",
    });
  }
};

export const getCartHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const cart = await GETBYID(req.params.id);
    cache.set(reqId, cart);

    res.status(200).json({
      data: cart,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CART_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get cart",
    });
  }
};

export const addCartHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const cart = await POST(req.body);
    res.status(200).json({
      data: cart,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CART_CONTROLLER_POST]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get cart",
    });
  }
};

export const updateCartHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const cart = await PATCH(req.body);
    res.status(200).json({
      data: cart,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CART_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get cart",
    });
  }
};

export const deleteCartHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      console.log(req.authData);

      return res.status(403).json({
        data: null,
        status: 200,
        error: "access denied",
        message: "you don't have required permissions",
        ok: false,
      });
    }

    const cart = await DELETE(req.body);
    res.status(200).json({
      data: cart,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[CART_CONTROLLER_GETALL]");
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get cart",
    });
  }
};
