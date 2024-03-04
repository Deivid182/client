import { createContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Toast from "../components/toast";
import { validateAuth } from "../api/api-client";

export type ToastMessage = {
  message: string;
  type: "success" | "error";
};

export type AppContextType = {
  showToast: (message: ToastMessage) => void;
  toast: ToastMessage | null;
  isAuth: boolean;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const { isError } = useQuery({
    queryKey: ["validateAuth"],
    queryFn: () => validateAuth(),
    retry: false,
  });
  const showToast = (message: ToastMessage) => {
    setToast(message);
  };
  return (
    <AppContext.Provider value={{ showToast, toast, isAuth: !isError }}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};
