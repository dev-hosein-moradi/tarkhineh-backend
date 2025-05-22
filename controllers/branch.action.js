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
        name: data.name,
        title: data.title,
        address: data.address,
        workTime: data.workTime,
        tel: data.tel || [], // Default empty array
        ownerFullName: data.ownerFullName,
        ownerPhone: data.ownerPhone,
        // Include other optional fields as needed
        image: data.image,
        verification: Boolean(data.verification),
        kitchen: Boolean(data.kitchen),
        // ... other fields
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

    const updated = await prisma.branch.update({
      where: { id: data.id },
      data: {
        name: data.name,
        title: data.title,
        address: data.address,
        workTime: data.workTime,
        tel: data.tel,
        image: data.image,
        verification:
          data.verification !== undefined
            ? Boolean(data.verification)
            : undefined,
        kitchen: data.kitchen !== undefined ? Boolean(data.kitchen) : undefined,
        // Only update fields that are provided
      },
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
