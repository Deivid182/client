import { RegisterData } from "../types";
export const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const register = async (values: RegisterData) => {
  const res = await fetch(`${SERVER_URL}/auth/`,{
    method: 'POST',
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