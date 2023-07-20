import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// TODO: use toasts from shadcn/ui
export const AppToast = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover
        limit={2}
      />
    </>
  );
};
