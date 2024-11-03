import { cache } from "../helpers/cache.js";
import { DELETE, GET, GETBYID, PATCH } from "./foods.action.js";

export const getFoodsHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const foods = await GET();
    // if (reqId) {
    //   cache.set(reqId, foods);
    // }

    res.status(200).json({
      data: foods,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get foods",
    });
  }
};

export const getFoodHandler = async (req, res) => {
  try {
    const { reqId } = req.body;
    const food = await GETBYID(req.params.id);
    // if (reqId) {
    //   cache.set(reqId, food);
    // }

    res.status(200).json({
      data: food,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in get food",
    });
  }
};

export const addFoodHandler = async (req, res) => {
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

    const food = await POST(req.body);
    res.status(200).json({
      data: food,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in add food",
    });
  }
};

export const updateFoodHandler = async (req, res) => {
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

    const food = await PATCH(req.body);
    res.status(200).json({
      data: food,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in update food",
    });
  }
};

export const deleteFoodHandler = async (req, res) => {
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

    const food = await DELETE(req.body);
    res.status(200).json({
      data: food,
      status: 200,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      status: 500,
      error: error,
      ok: false,
      message: "error in delete food",
    });
  }
};
