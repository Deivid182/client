import { useForm } from "react-hook-form";
import { LoginData } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/api-client";
import { useApp } from "../hooks/use-app";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  //TODO: disable the submit button if there is an error
  //TODO: add a loader

  //TODO: Edit the error api message
  const { showToast } = useApp();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      showToast({ message: data.message, type: "success" });
      await queryClient.invalidateQueries({ queryKey: ["validateAuth"] });
      navigate("/");
    },
    onError: (error) => {
      console.log(error.message);
      showToast({ message: error.message, type: "error" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2>Create an account</h2>
      <label htmlFor="email" className="text-gray-600 text-sm font-bold flex-1">
        Email
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          className="border rounded-md py-1 px-2 w-full font-normal"
        />
        {errors.email && (
          <span className="text-red-500">This field is required</span>
        )}
      </label>
      <label
        htmlFor="password"
        className="text-gray-600 text-sm font-bold flex-1"
      >
        Password
        <input
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          id="password"
          className="border rounded-md py-1 px-2 w-full font-normal"
        />
        {errors.password && (
          <span className="text-red-500">This field is required</span>
        )}
      </label>
      <div className="flex justify-between items-center">
        <span>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-blue-600 hover:text-blue-800"
          >
            Register
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 text-xl"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
