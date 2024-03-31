import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { hotelTypes } from "@/types";

interface TypeSelectionProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  watch: UseFormWatch<FieldValues>;
  required?: boolean;
  disabled?: boolean;
}

const TypeSelection: React.FC<TypeSelectionProps> = ({ register, watch, errors, id }) => {
  const type = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((value) => (
          <label
            key={value}
            className={`
            cursor-pointer rounded-full text-sm px-4 py-2 font-semibold
            ${
              type === value
                ? "bg-blue-500 text-white"
                : "bg-gray-300 "
            }
          `}
          >
            <input
              type="radio"
              value={value}
              className="sr-only"
              {...register("type", { required: true })}
            />
            <span>{value}</span>
          </label>
        ))}

        {errors[id] && <span className="text-red-500">This field is required</span>}
      </div>
    </div>
  );
};

export default TypeSelection;
