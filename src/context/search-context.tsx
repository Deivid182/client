import { createContext, useState } from "react"

type SearchValues = {
  destination: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childrenCount: number
}

export type SearchContextType = {
  searchValues: SearchValues
  hotelId: string
  saveSearchValues: (values: SearchValues) => void
}

export const SearchContext = createContext<SearchContextType | null>(null)

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchValues, setSearchValues] = useState<SearchValues>({
    destination: "",
    checkIn: new Date(),
    checkOut: new Date(),
    adultCount: 1,
    childrenCount: 0,
  })
  const [hotelId, setHotelId] = useState ("")
  const saveSearchValues = (values: SearchValues, hotelId?: string) => {
    setSearchValues(values)
    if(hotelId) setHotelId(hotelId) 
  } 
  return (
    <SearchContext.Provider
      value={{
        searchValues,
        hotelId,
        saveSearchValues
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}