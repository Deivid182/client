
const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container flex flex-col gap-2 md:flex-row md:gap-0 items-center md:justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          Mernholidays.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms and Conditions</p>
        </span>
      </div>
    </div>
  )
}

export default Footer