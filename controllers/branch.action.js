import prisma from "../utils/prisma.js";

export const GET = async () => {
  try {
    const branches = await prisma.branch.findMany({
      orderBy: { createdAt: "desc" }, // Optional: Sort by creation date
    });
    return {
      branches,
      success: true,
      message: "عملیات با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_GET]", error);
    return {
      success: false,
      message: "خطا در دریافت شعبه‌ها",
      error: error.message,
    };
  }
};

export const GETBYID = async (id) => {
  try {
    const branch = await prisma.branch.findUniqueOrThrow({
      where: { id: id },
    });
    return {
      branch,
      success: true,
      message: "عملیات با موفقیت انجام شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_GETBYID]", error);
    return {
      success: false,
      message: "خطا در دریافت شعبه",
      error: error.message,
    };
  }
};

export const POST = async (data) => {
  try {
    // Validate required fields
    if (!data.name || !data.title || !data.address || !data.workTime) {
      throw new Error(
        "فیلدهای اجباری (name, title, address, workTime) باید پر شوند"
      );
    }

    const newBranch = await prisma.branch.create({
      data: {
        // Required fields
        name: data.name,
        title: data.title,
        address: data.address,
        workTime: data.workTime,

        // Optional fields from schema
        ownerFullName: data.ownerFullName,
        ownerNatCode: data.ownerNatCode,
        ownerPhone: data.ownerPhone,
        ownerState: data.ownerState,
        ownerCity: data.ownerCity,
        ownerRegion: data.ownerRegion,
        ownerAddress: data.ownerAddress,
        ownerType: data.ownerType,
        placeArea: data.placeArea,
        placeAge: data.placeAge,

        // Boolean fields with defaults
        verification: Boolean(data.verification || false),
        kitchen: Boolean(data.kitchen || false),
        parking: Boolean(data.parking || false),
        store: Boolean(data.store || false),

        // Other fields
        image: data.image,
        tel: data.tel || [], // Default empty array
      },
    });

    return {
      newBranch,
      success: true,
      message: "شعبه با موفقیت ثبت شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_POST]", error);
    return {
      success: false,
      message: error.message || "خطا در ثبت شعبه",
      error: error.message,
    };
  }
};

export const PATCH = async (data) => {
  try {
    if (!data.id) throw new Error("شناسه شعبه ضروری است");

    // Build update data object dynamically, only including defined values
    const updateData = {};

    // Required fields
    if (data.name !== undefined) updateData.name = data.name;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.workTime !== undefined) updateData.workTime = data.workTime;

    // Owner information fields
    if (data.ownerFullName !== undefined)
      updateData.ownerFullName = data.ownerFullName;
    if (data.ownerNatCode !== undefined)
      updateData.ownerNatCode = data.ownerNatCode;
    if (data.ownerPhone !== undefined) updateData.ownerPhone = data.ownerPhone;
    if (data.ownerState !== undefined) updateData.ownerState = data.ownerState;
    if (data.ownerCity !== undefined) updateData.ownerCity = data.ownerCity;
    if (data.ownerRegion !== undefined)
      updateData.ownerRegion = data.ownerRegion;
    if (data.ownerAddress !== undefined)
      updateData.ownerAddress = data.ownerAddress;
    if (data.ownerType !== undefined) updateData.ownerType = data.ownerType;

    // Place information fields
    if (data.placeArea !== undefined) updateData.placeArea = data.placeArea;
    if (data.placeAge !== undefined) updateData.placeAge = data.placeAge;

    // Boolean fields
    if (data.verification !== undefined)
      updateData.verification = Boolean(data.verification);
    if (data.kitchen !== undefined) updateData.kitchen = Boolean(data.kitchen);
    if (data.parking !== undefined) updateData.parking = Boolean(data.parking);
    if (data.store !== undefined) updateData.store = Boolean(data.store);

    // Other fields
    if (data.image !== undefined) updateData.image = data.image;
    if (data.tel !== undefined) updateData.tel = data.tel;

    const updated = await prisma.branch.update({
      where: { id: data.id },
      data: updateData,
    });

    return {
      updated,
      success: true,
      message: "شعبه با موفقیت ویرایش شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_PATCH]", error);
    return {
      success: false,
      message: error.message || "خطا در ویرایش شعبه",
      error: error.message,
    };
  }
};

export const DELETE = async (id) => {
  try {
    if (!id) throw new Error("شناسه شعبه ضروری است");

    const deleted = await prisma.branch.delete({
      where: { id },
    });
    return {
      deleted,
      success: true,
      message: "شعبه با موفقیت حذف شد",
      error: null,
    };
  } catch (error) {
    console.error("[BRANCH_ACTION_DELETE]", error);
    return {
      success: false,
      message: error.message || "خطا در حذف شعبه",
      error: error.message,
    };
  }
};
