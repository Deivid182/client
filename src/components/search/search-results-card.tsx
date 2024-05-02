import { HotelType } from "@/types";
import { Star } from "../icons";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid xl:grid-cols-[2fr_3fr] border border-slate-300 p-5 rounded-lg gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover"
          alt="hotel image"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              {Array.from({ length: hotel.starRating }, (_, i) => (
                <Star key={i} />
              ))}
            </span>
            <span className="text-sm">{hotel.type}</span>
          </div>
          <Link to={`/hotels/${hotel._id}`} className="text-2xl font-bold cursor-pointer">{hotel.name}</Link>
        </div>
        <p className="line-clamp-4">{hotel.description}</p>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center flex-wrap">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3
                ? `+${hotel.facilities.length - 3} more`
                : null}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight} per night</span>
            <Link to={`/hotels/${hotel._id}`} className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
              View more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;