import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Input from "@/components/inputs/input";
import Select from "@/components/inputs/select";
import TypeSelection from "./type-selection";
import Facilities from "./facilities";
import ImagesSection from "./images-section";
import { HotelType } from "@/types";

type Props = {
  onSave: (data: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
};

const HotelForm: React.FC<Props> = ({ onSave, isLoading, hotel }) => {
  const [showImageSection, setShowImageSection] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
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

  useEffect(() => {
    if (hotel) {
      console.log(hotel)
      reset({
        name: hotel.name,
        city: hotel.city,
        country: hotel.country,
        description: hotel.description,
        pricePerNight: hotel.pricePerNight,
        type: hotel.type,
        facilities: hotel.facilities,
        adultCount: hotel.adultCount,
        childrenCount: hotel.childrenCount,
        starRating: hotel.starRating,
        imageUrls: hotel.imageUrls || [],
      });
    }
  }, [hotel, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);
    const formData = new FormData();
    if(hotel) formData.append("id", hotel._id.toString());
    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childrenCount", data.childrenCount.toString());

    data.facilities.forEach((facility: string, index: number) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if(data.imageUrls) {
      data.imageUrls.forEach((imageUrl: string, index: number) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      })
    }

    data.imageFiles && Array.from(data.imageFiles).forEach((imageFile) => {
      // Append each file to formData with a unique key
      formData.append(`imageFiles`, imageFile as File);
   });

    console.log(Object.fromEntries(formData));
    onSave(formData);
  };

  const isVisibleImagesSection = useMemo(() => {
    return showImageSection || !hotel?._id
  }, [hotel?._id, showImageSection]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl font-bold">{hotel ? "Edit hotel" : "Add new hotel"}</h2>
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
      <TypeSelection
        register={register}
        watch={watch}
        errors={errors}
        id="type"
      />
      <Facilities register={register} errors={errors} id="facilities" />
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
      
      <div className="flex gap-2 w-full items-baseline">

        <ImagesSection isVisible={isVisibleImagesSection} watch={watch} setValue={setValue} register={register} errors={errors} id="imageFiles" required={hotel?.imageUrls?.length ? false : true}/>
        {
          hotel?._id && (
          <button
            type="button"
            onClick={() => setShowImageSection(!showImageSection)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            {showImageSection ? "Keep" : "Add"}
          </button>
          )
        }
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default HotelForm;
