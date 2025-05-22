export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "توکن احراز هویت ارائه نشده است",
    });
  }

  try {
    req.authData = await verifyTokenAsync(token);
    next();
  } catch (err) {
    return res.status(403).json({
      ok: false,
      message: "توکن نامعتبر یا منقضی شده است",
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    // Assuming your JWT stores role
    return res.status(403).json({
      ok: false,
      message: "دسترسی محدود به مدیران سیستم",
    });
  }
  next();
};
