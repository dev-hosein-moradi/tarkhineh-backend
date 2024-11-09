export const getDateTime = async (req, res) => {
  try {
    const now = new Date();

    // Format the date as YYYY-MM-DDTHH:MMZ (without seconds)
    const formattedDate = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}Z`;

    res.status(200).json({
      data: formattedDate,
      error: null,
      ok: true,
      message: "",
    });
  } catch (error) {
    console.error("[DATE_CONTROLLER_GET]");
    res.status(500).json({
      data: null,
      error: error,
      ok: false,
      message: "سیستم با مشکل مواجه شده است لطفا دوباره تلاش کنید",
    });
  }
};
