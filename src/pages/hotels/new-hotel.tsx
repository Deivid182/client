import { useMutation } from "@tanstack/react-query"
import HotelForm from "@/forms/new-hotel-form/hotel-form"
import { newHotel } from "@/api/api-client"
import { useApp } from "@/hooks/use-app"
const NewHotel = () => {

  const { showToast } = useApp()
  const { mutate, isPending } = useMutation({
    mutationFn: newHotel,
    onSuccess: (data) => {
      console.log(data)
      showToast({ message: data.message, type: "success" })
    },
    onError: (error) => {
      console.log(error)
      showToast({ message: error.message, type: "error" })
    }
  })

  const handleAdd = (data: FormData) => {
    mutate(data)
  }
  
  return (
    <HotelForm onSave={handleAdd} isLoading={isPending} />
  )
}

export default NewHotel