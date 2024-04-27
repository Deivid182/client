import { FieldErrors, FieldValues, UseFormRegister, UseFormWatch, UseFormSetValue } from "react-hook-form";

interface TypeSelectionProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  watch?: UseFormWatch<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  id: string;
  required?: boolean;
  disabled?: boolean;
  isVisible?: boolean;
}


const ImagesSection: React.FC<TypeSelectionProps> = ({
  register,
  errors,
  id,
  watch,
  setValue,
  isVisible = true
}) => {

  const imageUrls = watch ? watch("imageUrls") : undefined;
  // console.log(imageUrls)

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, imageUrl: string) => {
    event.preventDefault();

    if (setValue) {
      setValue("imageUrls", imageUrls?.filter((url: string) => url !== imageUrl));
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-2xl font-semibold">Images</label>
      <div className="grid grid-cols-6 gap-2">
        {
          imageUrls && imageUrls.map((image: string) => (
            <div className="relative group" key={image}>
              <img src={image} alt="hotel image" className="w-full h-40 object-cover" />
              <button 
                onClick={(event) => handleDelete(event, image)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
                <span className="text-white text-xl">&#10005;</span>
              </button>
            </div>
          ))
        }
      </div>
      {isVisible && (
        <>
          <input id={id} multiple accept="image/*" className="w-full text-gray-500" type="file" {...register(id, {
            validate: (value) => {
              console.log(value)
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
        </>
      )}
    </div>
  )
}

export default ImagesSection