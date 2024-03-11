import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "date";
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
  isBig?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  register,
  errors,
  required,
  disabled,
  isBig,
}) => {
  return (
    <div className={`space-y-2 ${isBig ? "w-full" : "w-1/2"}`}>
      <label
        className="block text-sm font-medium text-gray-900 leading-6"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        disabled={disabled}
        {...register(id, {
          validate: (value) => {
            if (required && !value) {
              return "This field is required";
            }
          }
        })}
        className={`
        w-full
        py-2
        px-4
        font-light 
        bg-white 
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-blue-500"}
      `}
      />
      {errors[id] && (
        <span className="text-red-500">
          {errors[id]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export default Input;
