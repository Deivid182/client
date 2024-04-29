import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getHotels } from "@/api/api-client"
import { Building, Hotel, Map, Money } from "@/components/icons"
const Hotels = () => {

  const { data: hotels, isLoading, isError } = useQuery({ queryKey: ["hotels"], queryFn: getHotels })
  // console.log(hotels)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!hotels) {
    return <div>No hotels</div>
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/home/new-hotel"
          className="flex bg-blue-600 text-white text-xl px-4 py-2 rounded-md font-bold hover:bg-blue-700"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-5">
        {hotels.map((hotel) => (
          <div className="flex flex-col justify-between border gap-4 border-slate-300 p-5 rounded-lg" key={hotel._id}>
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid lg:grid-cols-5 gap-2">
              <div className="border border-slate-500 rounded-sm p-3 flex items-center">
                <Map />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-500 rounded-sm p-3 flex items-center">
                <Building />
                {hotel.type}
              </div>
              <div className="border border-slate-500 rounded-sm p-3 flex items-center">
                <Money />
                ${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-500 rounded-sm p-3 flex items-center">
                <Hotel />
                {hotel.adultCount} adults, {hotel.childrenCount} children
              </div>
              <div className="border border-slate-500 rounded-sm p-3 flex items-center">
                <Hotel />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link 
                className="flex bg-blue-600 text-white text-xl px-4 py-2 rounded-md font-bold hover:bg-blue-700"
                to={`/home/edit-hotel/${hotel._id}`}
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels