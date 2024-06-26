import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getHotel } from "@/api/api-client";
import { Star } from "@/components/icons";
import GuestInfo from "@/forms/guest-info/guest-info";

interface Params extends Record<string, string | undefined> {
  id: string;
}

const Detail = () => {
  const { id } = useParams<Params>();

  const { data: hotel } = useQuery({
    queryKey: ['hotel', id],
    queryFn: () => {
      if (typeof id === 'string') {
        return getHotel(id);
      }
      throw new Error('Hotel ID is undefined');
    }
  });

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <Star key={index}/>
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image) => (
          <div className="h-[300px]" key={image}>
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility) => (
          <div key={facility} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfo
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;