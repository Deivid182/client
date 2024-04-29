import { useQuery } from "@tanstack/react-query"
import { useSearch } from "@/hooks/use-search"
import { searchHotels } from "@/api/api-client"
import { useState } from "react"


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
    <div>Search</div>
  )
}

export default Search