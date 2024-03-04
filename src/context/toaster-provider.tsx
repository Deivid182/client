import { createContext } from "react"

export type ToastMessage = {
  message: string
  type: "success" | "error"
}

export type ToastContextType = {
  showToast : (message: ToastMessage) => void
}

export const ToastContext = createContext<ToastContextType | null>(null)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showToast = (message: ToastMessage) => {
    console.log(message)
  }
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  )
}
