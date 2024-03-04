import { useContext } from "react";
import { ToastContext, ToastContextType } from "../context/toaster-provider";

export const useToast = () => {
  return useContext(ToastContext) as ToastContextType
}