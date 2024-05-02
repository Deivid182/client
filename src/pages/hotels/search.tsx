import { useQuery } from "@tanstack/react-query"
import { useSearch } from "@/hooks/use-search"
import { searchHotels } from "@/api/api-client"
import { useState } from "react"
import SearchResultsCard from "@/components/search/search-results-card"


const Search = () => {
  const { searchValues } = useSearch()
  const [page, setPage] = useState(1)

  const searchParams = {
    destination: searchValues.destination,
    checkIn: searchValues.checkIn.toISOString(),
    checkOut: searchValues.checkOut.toISOString(),
    adultCount: searchValues.adultCount.toString(),
    childrenCount: searchValues.childrenCount.toString(),
    page: page.toString()
  }

  const { data, isPending } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => searchHotels(searchParams),
  })

  return (
    <div className="grid lg:grid-cols-[1fr_3fr] gap-5">
      <div className="rounded-lg border border-slate-300 bg-white p-5 h-fit sticky mt-12 top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
          {/* TODO FILTERS */}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels found
            {searchValues.destination && ` in ${searchValues.destination}`}
          </span>
          {/* TODO sort options */}
        </div>
        {data?.data.map((hotel) => (
          <SearchResultsCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}

export default Search