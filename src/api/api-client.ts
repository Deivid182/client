import { RegisterData, LoginData, HotelType,HotelSearchResponse } from "../types";
export const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const register = async (values: RegisterData) => {
  const res = await fetch(`${SERVER_URL}/auth/`,{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const login = async (values: LoginData) => {
  const res = await fetch(`${SERVER_URL}/auth/login`,{
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const logout = async () => {
  const res = await fetch(`${SERVER_URL}/auth/logout`,{
    method: 'POST',
    credentials: 'include'
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const validateAuth = async () => {
  const res = await fetch(`${SERVER_URL}/auth/validate-auth`,{
    method: 'GET',
    credentials: 'include'
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const newHotel = async (data: FormData) => {
  const res = await fetch(`${SERVER_URL}/my-hotels`,{
    method: 'POST',
    credentials: 'include',
    body: data
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const getHotels = async (): Promise<HotelType[]> => {
  const res = await fetch(`${SERVER_URL}/my-hotels`, {
    credentials: 'include'
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const getHotel = async (id: HotelType["_id"]): Promise<HotelType> => {
  const res = await fetch(`${SERVER_URL}/my-hotels/${id}`, {
    credentials: 'include'
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const editHotel = async (id: HotelType["_id"], data: FormData) => {
  const res = await fetch(`${SERVER_URL}/my-hotels/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    body: data
  })
  if(res.ok) {
    return await res.json()
  } else {
    console.log(await res.text())
    throw new Error(await res.text())
  }
}

export type SearchParams = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childrenCount?: string
  page?: string
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams()
  queryParams.append("destination", searchParams.destination || "")
  queryParams.append("checkIn", searchParams.checkIn || "")
  queryParams.append("checkOut", searchParams.checkOut || "")
  queryParams.append("adultCount", searchParams.adultCount || "")
  queryParams.append("childrenCount", searchParams.childrenCount || "")
  queryParams.append("page", searchParams.page || "")

  const res = await fetch(`${SERVER_URL}/hotels/search?${queryParams.toString()}`)
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}