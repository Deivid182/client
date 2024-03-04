import { useContext } from "react";
import { AppContext, AppContextType } from "../context/app-provider";

export const useApp = () => {
  return useContext(AppContext) as AppContextType
}