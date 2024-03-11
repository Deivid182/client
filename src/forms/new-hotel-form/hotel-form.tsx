import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query"
import Input from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import TypeSelection from "./type-selection";
import Facilities from "./facilities";
import ImagesSection from "./images-section";

const HotelForm = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      city: "",
      country: "",
      description: "",
      pricePerNight: 0,
      type: "",
      facilities: [],
      adultCount: 0,
      childrenCount: 0,
      starRating: 0,
      imageUrls: [],
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childrenCount", data.childrenCount.toString());


    console.log(formData);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <div className="flex gap-2 w-full">
        <Input
          type="text"
          id="city"
          label="City"
          register={register}
          errors={errors}
          required
        />
        <Input
          type="text"
          id="country"
          label="Country"
          register={register}
          errors={errors}
          required
        />
      </div>
      <Input
        type="text"
        id="description"
        label="Description"
        register={register}
        errors={errors}
        required
      />
      <Input
        type="number"
        id="pricePerNight"
        label="Price per night"
        register={register}
        errors={errors}
        required
      />
      <Select
        label="Star rating"
        id="starRating"
        options={[1, 2, 3, 4, 5]}
        register={register}
        errors={errors}
        required
      />
      <TypeSelection register={register} watch={watch} errors={errors} id="type"/>
      <Facilities register={register} errors={errors} id="facilities"/>
      <div className="flex gap-2 w-full bg-gray-300 p-6">
        <Input
          type="number"
          id="adultCount"
          label="Adult count"
          register={register}
          errors={errors}
          required
        />
        <Input
          type="number"
          id="childrenCount"
          label="Children count"
          register={register}
          errors={errors}
          required
        />
      </div>
      <ImagesSection register={register} errors={errors} id="imageUrls"/>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default HotelForm;
