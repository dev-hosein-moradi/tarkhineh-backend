import prisma from "../utils/prisma.js";

const foodSelectFields = {
  id: true,
  name: true,
  compounds: true,
  type: true,
  tag: true,
  rate: true,
  percentOfDiscount: true,
  discountPrice: true,
  mainPrice: true,
  isFavorite: true,
  numOfScore: true,
  image: true,
  createdAt: true,
};

export const GET = async () => {
  try {
    const foods = await prisma.food.findMany({
      select: foodSelectFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: foods,
      message: "Foods fetched successfully",
    };
  } catch (error) {
    console.error("[FOOD_GET_ALL_ERROR]:", error);
    return {
      success: false,
      message: "Error fetching foods",
      error: error.message,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const food = await prisma.food.findUnique({
      where: { id },
      select: foodSelectFields,
    });

    if (!food) {
      return {
        success: false,
        message: "Food not found",
        error: { code: "P2025" },
      };
    }

    return {
      success: true,
      data: food,
      message: "Food fetched successfully",
    };
  } catch (error) {
    console.error("[FOOD_GET_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "Error fetching food",
      error: error.message,
    };
  }
};

export const POST = async (data) => {
  try {
    const requiredFields = ["name", "compounds", "type", "mainPrice"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        error: "ValidationError",
      };
    }

    const newFood = await prisma.food.create({
      data: {
        name: data.name,
        compounds: data.compounds,
        type: data.type,
        tag: data.tag || "",
        rate: parseFloat(data.rate || 0),
        percentOfDiscount: parseFloat(data.percentOfDiscount || 0),
        discountPrice: data.discountPrice || data.mainPrice,
        mainPrice: data.mainPrice,
        isFavorite: Boolean(data.isFavorite),
        numOfScore: parseInt(data.numOfScore || 0),
        image: data.image || "",
      },
      select: foodSelectFields,
    });

    return {
      success: true,
      data: newFood,
      message: "Food created successfully",
    };
  } catch (error) {
    console.error("[FOOD_CREATE_ERROR]:", error);
    return {
      success: false,
      message: "Error creating food",
      error: error.message,
    };
  }
};

export const PATCH = async ({ id, ...data }) => {
  try {
    const updated = await prisma.food.update({
      where: { id },
      data: {
        name: data.name,
        compounds: data.compounds,
        type: data.type,
        tag: data.tag,
        rate: data.rate !== undefined ? parseFloat(data.rate) : undefined,
        percentOfDiscount:
          data.percentOfDiscount !== undefined
            ? parseFloat(data.percentOfDiscount)
            : undefined,
        discountPrice: data.discountPrice,
        mainPrice: data.mainPrice,
        isFavorite:
          data.isFavorite !== undefined ? Boolean(data.isFavorite) : undefined,
        numOfScore:
          data.numOfScore !== undefined ? parseInt(data.numOfScore) : undefined,
        image: data.image,
      },
      select: foodSelectFields,
    });

    return {
      success: true,
      data: updated,
      message: "Food updated successfully",
    };
  } catch (error) {
    console.error("[FOOD_UPDATE_ERROR]:", error);
    return {
      success: false,
      message: "Error updating food",
      error: error.message,
    };
  }
};

export const DELETE = async (id) => {
  try {
    await prisma.food.delete({
      where: { id },
    });
    return {
      success: true,
      data: { id },
      message: "Food deleted successfully",
    };
  } catch (error) {
    console.error("[FOOD_DELETE_ERROR]:", error);
    return {
      success: false,
      message: "Error deleting food",
      error: error.message,
    };
  }
};
