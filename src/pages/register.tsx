import { useForm } from "react-hook-form";
import { RegisterData } from "../types"
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../api/api-client";
import { useApp } from "../hooks/use-app";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //TODO: disable the submit button if there is an error
  //TODO: add a loader
  const { showToast } = useApp()
  const navigate = useNavigate()
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();


  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      showToast({ message: data.message, type: "success" })
      navigate("/")
    },
    onError: (error) => {
      console.log(error)
      showToast({ message: error.message, type: "error" })
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data)
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h2>Create an account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          htmlFor="firstName"
          className="text-gray-600 text-sm font-bold flex-1"
        >
          First Name
          <input
            {...register("firstName", { required: true })}
            type="text"
            id="firstName"
            className="border rounded-md py-1 px-2 w-full font-normal"
          />
          {errors.firstName && (
            <span className="text-red-500">This field is required</span>
          )}
        </label>
        <label
          htmlFor="lastName"
          className="text-gray-600 text-sm font-bold flex-1"
        >
          Last name
          <input
            {...register("lastName", { required: true })}
            type="text"
            id="lastName"
            className="border rounded-md py-1 px-2 w-full font-normal"
          />
          {errors.lastName && (
            <span className="text-red-500">This field is required</span>
          )}
        </label>
      </div>
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
      <label
        htmlFor="passwordConfirmation"
        className="text-gray-600 text-sm font-bold flex-1"
      >
        Password Confirmation
        <input
          {...register("confirmPassword", {
            required: true,
            validate: (value) => {
              if (!value) return "Please confirm your password";
              else if (watch("password") !== value) {
                return "Passwords do not match";
              }
            },
          })}
          type="password"
          id="passwordConfirmation"
          className="border rounded-md py-1 px-2 w-full font-normal"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">This field is required</span>
        )}
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 text-xl"
      >
        Register
      </button>
    </form>
  );
};

export default Register;
