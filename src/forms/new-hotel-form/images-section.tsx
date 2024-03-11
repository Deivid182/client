import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TypeSelectionProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  id: string;
  required?: boolean;
  disabled?: boolean;
}


const ImagesSection: React.FC<TypeSelectionProps> = ({
  register,
  errors,
  id
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="images">Images</label>
      <input id="images" multiple accept="image/*" className="w-full text-gray-500" type="file" {...register(id, {
        validate: (value) => {
          if (value.length === 0) {
            return "Please select at least one image";
          }

          if (value.length > 6) {
            return "Please select at most 5 images";
          }
          return true
        }
      })} />

      {errors[id] && <span className="text-red-500">Please select at least one image</span>}
    </div>
  )
}

export default ImagesSection