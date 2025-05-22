import { DELETE, GET, GETBYID, PATCH, POST } from "./branch.action.js";

export const getBranchsHandler = async (req, res) => {
  try {
    const result = await GET();  // Changed from branchs to result for clarity
    if (result.success) {
      res.status(200).json({
        data: result.branches,  // Changed from branchs to branches (matches action return)
        error: null,
        ok: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: result.error || "خطا در دریافت اطلاعات",
        ok: false,
        message: result.message || "در دریافت شعبه‌ها مشکلی پیش آمده است",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GETALL]", error);
    res.status(500).json({
      data: null,
      error: error.message,  // Return error message instead of full error
      ok: false,
      message: "خطای سرور: لطفا دوباره تلاش کنید",
    });
  }
};

export const getBranchHandler = async (req, res) => {
  try {
    const result = await GETBYID(req.params.id);
    if (result.success) {
      res.status(200).json({
        data: result.branch,
        error: null,
        ok: true,
        message: result.message,
      });
    } else {
      res.status(result.error?.code === 'P2025' ? 404 : 400).json({  // Handle not found
        data: null,
        error: result.error?.message || "خطا در دریافت اطلاعات",
        ok: false,
        message: result.message || "شعبه مورد نظر یافت نشد",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_GET]", error);
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور: لطفا دوباره تلاش کنید",
    });
  }
};

export const addBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "دسترسی غیرمجاز",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const result = await POST(req.body);
    if (result.success) {
      res.status(201).json({  // Changed to 201 for resource creation
        data: result.newBranch,
        error: null,
        ok: true,
        message: result.message,
      });
    } else {
      res.status(400).json({
        data: null,
        error: result.error?.message || "خطا در اعتبارسنجی داده‌ها",
        ok: false,
        message: result.message || "داده‌های ارسالی نامعتبر هستند",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_POST]", error);
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور در ایجاد شعبه جدید",
    });
  }
};

export const updateBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "دسترسی غیرمجاز",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const result = await PATCH({ id: req.params.id, ...req.body });  // Use params.id
    if (result.success) {
      res.status(200).json({
        data: result.updated,
        error: null,
        ok: true,
        message: result.message,
      });
    } else {
      const statusCode = result.error?.code === 'P2025' ? 404 : 400;
      res.status(statusCode).json({
        data: null,
        error: result.error?.message || "خطا در به‌روزرسانی",
        ok: false,
        message: result.message || "به‌روزرسانی انجام نشد",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_PATCH]", error);
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور در به‌روزرسانی اطلاعات",
    });
  }
};

export const deleteBranchsHandler = async (req, res) => {
  try {
    if (req.authData.userType !== "admin") {
      return res.status(403).json({
        data: null,
        error: "دسترسی غیرمجاز",
        message: "شما مجوز لازم برای انجام این عملیات را ندارید",
        ok: false,
      });
    }

    const result = await DELETE(req.params.id);  // Use params.id instead of body
    if (result.success) {
      res.status(200).json({
        data: result.deleted,
        error: null,
        ok: true,
        message: result.message,
      });
    } else {
      const statusCode = result.error?.code === 'P2025' ? 404 : 400;
      res.status(statusCode).json({
        data: null,
        error: result.error?.message || "خطا در حذف",
        ok: false,
        message: result.message || "حذف شعبه انجام نشد",
      });
    }
  } catch (error) {
    console.error("[BRANCH_CONTROLLER_DELETE]", error);
    res.status(500).json({
      data: null,
      error: error.message,
      ok: false,
      message: "خطای سرور در حذف شعبه",
    });
  }
};
