import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"
import Hero from "../components/hero"
import SearchBar from "@/components/searchbar"

const Default = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto">
          <SearchBar />
      </div>
      <div className="container flex-1 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Default