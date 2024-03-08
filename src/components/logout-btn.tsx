import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { logout } from "../api/api-client";
import { useApp } from "../hooks/use-app";
const LogoutBtn = () => {
  const { showToast } = useApp();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      console.log(data);
      await queryClient.invalidateQueries({ queryKey: ["validateAuth"] });
      showToast({ message: data.message, type: "success" });
    },
    onError: (error) => {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    },
  });

  const onClick = useCallback(() => {
    mutation.mutate();
    navigate("/login", { replace: true });    
  }, [mutation, navigate]);

  return (
    <button
      onClick={onClick}
      className="bg-white text-blue-600 px-3 font-bold hover:bg-gray-100 "
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
