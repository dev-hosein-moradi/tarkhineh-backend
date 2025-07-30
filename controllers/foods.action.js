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

const accompanimentSelectFields = {
  id: true,
  name: true,
  categoryId: true,
  category: {
    select: {
      id: true,
      name: true,
      title: true,
    },
  },
  price: true,
  image: true,
  description: true,
  available: true,
  createdAt: true,
};

const categorySelectFields = {
  id: true,
  name: true,
  title: true,
  image: true,
  createdAt: true,
};

// FOOD FUNCTIONS
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

// ACCOMPANIMENT FUNCTIONS
export const GET_ACCOMPANIMENTS = async () => {
  try {
    const accompaniments = await prisma.accompaniment.findMany({
      select: accompanimentSelectFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: accompaniments,
      message: "Accompaniments fetched successfully",
    };
  } catch (error) {
    console.error("[ACCOMPANIMENT_GET_ALL_ERROR]:", error);
    return {
      success: false,
      message: "Error fetching accompaniments",
      error: error.message,
    };
  }
};

export const GET_ACCOMPANIMENT_BY_ID = async (id) => {
  try {
    const accompaniment = await prisma.accompaniment.findUnique({
      where: { id },
      select: accompanimentSelectFields,
    });

    if (!accompaniment) {
      return {
        success: false,
        message: "Accompaniment not found",
        error: { code: "P2025" },
      };
    }

    return {
      success: true,
      data: accompaniment,
      message: "Accompaniment fetched successfully",
    };
  } catch (error) {
    console.error("[ACCOMPANIMENT_GET_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "Error fetching accompaniment",
      error: error.message,
    };
  }
};

export const POST_ACCOMPANIMENT = async (data) => {
  try {
    const requiredFields = ["name", "categoryId", "price"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        error: "ValidationError",
      };
    }

    const newAccompaniment = await prisma.accompaniment.create({
      data: {
        name: data.name,
        categoryId: data.categoryId,
        price: data.price,
        image: data.image || "",
        description: data.description || "",
        available: Boolean(data.available ?? true),
      },
      select: accompanimentSelectFields,
    });

    return {
      success: true,
      data: newAccompaniment,
      message: "Accompaniment created successfully",
    };
  } catch (error) {
    console.error("[ACCOMPANIMENT_CREATE_ERROR]:", error);
    return {
      success: false,
      message: "Error creating accompaniment",
      error: error.message,
    };
  }
};

export const PATCH_ACCOMPANIMENT = async ({ id, ...data }) => {
  try {
    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.categoryId !== undefined) updateData.categoryId = data.categoryId;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.available !== undefined)
      updateData.available = Boolean(data.available);

    const updated = await prisma.accompaniment.update({
      where: { id },
      data: updateData,
      select: accompanimentSelectFields,
    });

    return {
      success: true,
      data: updated,
      message: "Accompaniment updated successfully",
    };
  } catch (error) {
    console.error("[ACCOMPANIMENT_UPDATE_ERROR]:", error);
    return {
      success: false,
      message: "Error updating accompaniment",
      error: error.message,
    };
  }
};

export const DELETE_ACCOMPANIMENT = async (id) => {
  try {
    await prisma.accompaniment.delete({
      where: { id },
    });
    return {
      success: true,
      data: { id },
      message: "Accompaniment deleted successfully",
    };
  } catch (error) {
    console.error("[ACCOMPANIMENT_DELETE_ERROR]:", error);
    return {
      success: false,
      message: "Error deleting accompaniment",
      error: error.message,
    };
  }
};

// CATEGORY FUNCTIONS
export const GET_ACCOMPANIMENT_CATEGORIES = async () => {
  try {
    const categories = await prisma.accompanimentCategory.findMany({
      select: categorySelectFields,
      orderBy: { createdAt: "desc" },
    });
    return {
      success: true,
      data: categories,
      message: "Categories fetched successfully",
    };
  } catch (error) {
    console.error("[CATEGORY_GET_ALL_ERROR]:", error);
    return {
      success: false,
      message: "Error fetching categories",
      error: error.message,
    };
  }
};

export const GET_ACCOMPANIMENT_CATEGORY_BY_ID = async (id) => {
  try {
    const category = await prisma.accompanimentCategory.findUnique({
      where: { id },
      select: {
        ...categorySelectFields,
        accompaniments: {
          select: accompanimentSelectFields,
        },
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
        error: { code: "P2025" },
      };
    }

    return {
      success: true,
      data: category,
      message: "Category fetched successfully",
    };
  } catch (error) {
    console.error("[CATEGORY_GET_BY_ID_ERROR]:", error);
    return {
      success: false,
      message: "Error fetching category",
      error: error.message,
    };
  }
};

export const POST_ACCOMPANIMENT_CATEGORY = async (data) => {
  try {
    const requiredFields = ["name", "title"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
        error: "ValidationError",
      };
    }

    const newCategory = await prisma.accompanimentCategory.create({
      data: {
        name: data.name,
        title: data.title,
        image: data.image || "",
      },
      select: categorySelectFields,
    });

    return {
      success: true,
      data: newCategory,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error("[CATEGORY_CREATE_ERROR]:", error);
    return {
      success: false,
      message: "Error creating category",
      error: error.message,
    };
  }
};

export const PATCH_ACCOMPANIMENT_CATEGORY = async ({ id, ...data }) => {
  try {
    const updateData = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.image !== undefined) updateData.image = data.image;

    const updated = await prisma.accompanimentCategory.update({
      where: { id },
      data: updateData,
      select: categorySelectFields,
    });

    return {
      success: true,
      data: updated,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("[CATEGORY_UPDATE_ERROR]:", error);
    return {
      success: false,
      message: "Error updating category",
      error: error.message,
    };
  }
};

export const DELETE_ACCOMPANIMENT_CATEGORY = async (id) => {
  try {
    await prisma.accompanimentCategory.delete({
      where: { id },
    });
    return {
      success: true,
      data: { id },
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("[CATEGORY_DELETE_ERROR]:", error);
    return {
      success: false,
      message: "Error deleting category",
      error: error.message,
    };
  }
};
