import { useFormContext } from "react-hook-form";
const DetailsSection = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Add Hotel</h1>
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
    </div>
  );
};

export default DetailsSection;
