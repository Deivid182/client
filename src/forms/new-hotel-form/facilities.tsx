import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { hotelFacilities } from "@/types";

interface FacilitiesProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  required?: boolean;
  disabled?: boolean;
}

const Facilities: React.FC<FacilitiesProps> = ({ register, errors, id }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((value) => (
          <label
            key={value}
            className="text-sm flex gap-1"
          >
            <input
              type="checkbox"
              value={value}
              className="border-gray-300 rounded-md shadow-sm"
              {...register(id, {
                validate: (value) => {
                  if (value.length === 0) {
                    return "Please select at least one facility";
                  }
                },
              })}
            />
            <span>{value}</span>
          </label>
        ))}
      </div>

      {errors[id] && <span className="text-red-500">Please select at least one facility</span>}
    </div>
  );
};

export default Facilities;
