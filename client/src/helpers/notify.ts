// package import
import { toast } from "react-toastify";

// types import
// import { ToastType } from "../context/ToastContext";
import { ToastType } from "../types/types";

// use context
export const showNotify = (
  message: string,
  type: ToastType,
  setMessage: (message: string, type: ToastType) => void
) => {
  if (message) {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        break;
    }
    setMessage('', null);
  }
};

// use redux toolkit
export const reduxShowNotify = (
  message: string,
  type: ToastType,
) => {
  if(message){
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      case 'error':
        toast.error(message);
        break;
      default:
        break;
    }
  }
}