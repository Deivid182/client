import { Link } from "react-router-dom";
import { useApp } from "../hooks/use-app";

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
                to={"/my-bookings"}
                className="flex items-center text-white hover:text-blue-600"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="flex items-center text-white hover:text-blue-600"
              >
                My Hotels
              </Link>
              <button>Log Out</button>
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
