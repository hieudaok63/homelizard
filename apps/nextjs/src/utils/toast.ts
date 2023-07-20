import { toast } from "react-toastify";

export const showAppToast = (
  text: any,
  type?: "success" | "error" | "info" | "warning" | "default",
  themeMode?: "colored" | "light" | "dark",
) => {
  switch (type) {
    case "success":
      toast.success(text, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode || "colored",
      });
      break;
    case "error":
      toast.error(text, {
        position: "top-right",
        hideProgressBar: true,
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode || "colored",
      });
      break;
    case "warning":
      toast.warning(text, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode || "colored",
      });
      break;
    case "info":
      toast.warning(text, {
        position: "top-right",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: themeMode || "colored",
      });
      break;
    default:
      toast(text, {
        position: "top-right",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      break;
  }
};
