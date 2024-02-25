import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>MernHolidays</Link>
        </span>
        <span className="flex gap-2">
          <Link to={"/sign-in"} className="flex items-center text-blue-600 bg-white px-3 font-bold hover:bg-gray-100 hover:text-blue-800">Login</Link>
          <Link to={"/sign-up"} className="flex items-center text-white hover:text-blue-600">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
