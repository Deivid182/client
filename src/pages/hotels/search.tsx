import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@/hooks/use-search";
import SearchResultsCard from "@/components/search/search-results-card";
import Pagination from "@/components/pagination";
import StarRatingFilter from "@/components/filters/star-rating-filter";
import HotelTypeFilter from "@/components/filters/hotel-type-filter";
import FacilitiesFilter from "@/components/filters/facilities-filter";
import PriceFilter from "@/components/filters/price-filter";
import { searchHotels } from "@/api/api-client";

const Search = () => {
  const { searchValues } = useSearch();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("");

  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const searchParams = {
    destination: searchValues.destination,
    checkIn: searchValues.checkIn.toISOString(),
    checkOut: searchValues.checkOut.toISOString(),
    adultCount: searchValues.adultCount.toString(),
    childrenCount: searchValues.childrenCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => searchHotels(searchParams),
  });

  const handleSelectStars = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prev) =>
      event.target.checked
        ? [...prev, hotelType]
        : prev.filter((item) => item !== hotelType)
    );
  };
  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((item) => item !== facility)
    );
  };

  return (
    <div className="grid lg:grid-cols-[1fr_3fr] gap-5">
      <div className="rounded-lg border border-slate-300 bg-white p-5 h-fit sticky mt-12 top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleSelectStars}
          />
          <HotelTypeFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels found
            {searchValues.destination && ` in ${searchValues.destination}`}
          </span>
          {/* TODO sort options */}
          <select
            className="p-2 border rounded-md"
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {data?.data.map((hotel) => (
          <SearchResultsCard key={hotel._id} hotel={hotel} />
        ))}
        <Pagination
          page={data?.pagination.page || 1}
          pages={data?.pagination.pages || 1}
          onPageChange={(page) => setPage(page)}
        />
      </div>
    </div>
  );
};

export default Search;
