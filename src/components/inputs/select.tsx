import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  id: string;
  options: string[] | number[];
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  register,
  errors,
  required,
  disabled,
}) => {
  return (
    <div className="max-w-xs space-y-2">
      <label
        className="block text-sm font-medium text-gray-900 leading-6"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        {...register(id, { required })}
        id={id}
        disabled={disabled}
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
      >
        <option value="">Select {label}</option>
        {options.map((value) => (
          <option value={value} key={value}>{value}</option>
        ))}
      </select>
      {errors[id] && <span className="text-red-500">Please select an option</span>}
    </div>
  );
};

export default Select;
