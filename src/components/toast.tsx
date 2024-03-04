import { useEffect } from "react";

type Props = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: Props ) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } flex items-center justify-center fixed top-4 right-4 z-50 p-4 rounded-md text-white max-w-md`}
    >
      <div className="text-lg font-semibold">{message}</div>
    </div>
  );
};

export default Toast;
