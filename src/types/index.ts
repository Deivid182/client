export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
}

export type HotelFormData = {
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childrenCount: number
  facilities: string[]
  imageUrls: FileList
  pricePerNight: number
  starRating: number
}

export const hotelTypes = [
  "Budget",
  "Boutique",
  "Luxury",
  "Ski Resort",
  "Business",
  "Family",
  "Romantic",
  "Hiking Resort",
  "Cabin",
  "Beach Resort",
  "Golf Resort",
  "Motel",
  "All Inclusive",
  "Pet Friendly",
  "Self Catering",
];

export const hotelFacilities = [
  "Free WiFi",
  "Parking",
  "Airport Shuttle",
  "Family Rooms",
  "Non-Smoking Rooms",
  "Outdoor Pool",
  "Spa",
  "Fitness Center",
];

export type HotelType = {
  _id: string
  userId: string
  name: string
  city: string
  country: string
  description: string
  type: string
  adultCount: number
  childrenCount: number
  facilities: string[]
  imageUrls: string[]
  imageFiles: string[]
  pricePerNight: number
  starRating: number
  createdAt: string
  updatedAt: string
} 