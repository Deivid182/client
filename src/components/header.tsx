import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../hooks/use-app";
import LogoutBtn from "./logout-btn";
import { Menu } from "./icons";

const Header = () => {
  const { isAuth } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-blue-800 py-6">
      <div className="container flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays</Link>
        </span>
          {isAuth ? (
            <div className="relative">
              <div className="hidden lg:flex gap-2">
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
              </div>
              <button
                className="lg:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <span className="text-white text-xl">&#10005;</span> : <Menu />}
              </button>
              {showMenu && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                >
                  <Link
                    to={"/home/my-bookings"} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Bookings
                  </Link>
                  <Link
                    to={"/home/"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Hotels
                  </Link>
                  <LogoutBtn />
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 hover:text-blue-800"
            >
              Login
            </Link>
          )}
      </div>
    </div>
  );
};

export default Header;
