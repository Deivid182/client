import { useQuery, useMutation } from "@tanstack/react-query"
import { useApp } from "@/hooks/use-app"
import { useNavigate, useParams } from "react-router-dom"
import { getHotel, editHotel } from "@/api/api-client"
import HotelForm from "@/forms/new-hotel-form/hotel-form"

interface Params extends Record<string, string | undefined> {
  id: string;
}

const EditHotel = () => {

  const { showToast } = useApp()
  const navigate = useNavigate()
  const { id } = useParams<Params>()
  const { data: hotel } = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => {
      if (typeof id === 'string') {
        return getHotel(id);
      }
      throw new Error('Hotel ID is undefined');
    }
  })
  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => {
      if (typeof id === 'string') {
        return editHotel(id, data)
      }
      throw new Error('Hotel ID is undefined');
    },
    onSuccess: () => {
      showToast({ message: "Hotel updated successfully", type: "success" })
      setTimeout(() => navigate("/home"), 3000)
    },
    onError: () => {
      showToast({ message: "Failed to update hotel", type: "error" })
    }
  })

  const handleEdit = (data: FormData) => {
    mutate(data)
  }
  return (
    <HotelForm hotel={hotel} isLoading={isPending} onSave={handleEdit} />
  )
}

export default EditHotel