import { Link } from "react-router-dom";
import { useApp } from "../hooks/use-app";
import LogoutBtn from "./logout-btn";

const Header = () => {
  const { isAuth } = useApp();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays</Link>
        </span>
        <span className="flex gap-2">
          {isAuth ? (
            <>
              <Link
                to={"/home/my-bookings"} 
                className="flex items-center text-white hover:bg-blue-600 px-3"
              >
                My Bookings
              </Link>
              <Link
                to={"/home/"}
                className="flex items-center text-white hover:bg-blue-600 px-3"
              >
                My Hotels
              </Link>
              <LogoutBtn />
            </>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 hover:text-blue-800"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
