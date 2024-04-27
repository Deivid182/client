import { RegisterData, LoginData, HotelType } from "../types";
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
  const res = await fetch(`${SERVER_URL}/hotels`,{
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
  const res = await fetch(`${SERVER_URL}/hotels`, {
    credentials: 'include'
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const getHotel = async (id: HotelType["_id"]): Promise<HotelType> => {
  const res = await fetch(`${SERVER_URL}/hotels/${id}`, {
    credentials: 'include'
  })
  if(res.ok) {
    return await res.json()
  } else {
    throw new Error(await res.text())
  }
}

export const editHotel = async (id: HotelType["_id"], data: FormData) => {
  const res = await fetch(`${SERVER_URL}/hotels/${id}`, {
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