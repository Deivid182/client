import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { TravelExplore } from "./icons";
import { useSearch } from "@/hooks/use-search";
import "react-datepicker/dist/react-datepicker.css";
const SearchBar = () => {
  const { saveSearchValues, searchValues } = useSearch();
  const [searhBarValues, setSearhBarValues] = useState(searchValues);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSearchValues(searhBarValues);
    navigate("/search");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type: typeInput } = event.target;
    // console.log(typeInput)
    const isNumericField = typeInput === "number";
    // console.log(isNumericField)
    setSearhBarValues((prev) => ({
      ...prev,
      [name]: isNumericField ? Number(value) : value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3 items-center"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <TravelExplore />
        <input
          type="text"
          name="destination"
          className="w-full focus:outline-none ml-2"
          value={searhBarValues.destination}
          onChange={handleChange}
          placeholder="Search"
        />
      </div>
      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="flex flex-1 items-center">
          Adults:
          <input
            type="number"
            name="adultCount"
            min={1}
            max={20}
            value={searhBarValues.adultCount}
            onChange={handleChange}
            placeholder="1"
            className="focus:outline-none w-full p-1 font-bold"
          />
        </label>
        <label className="flex flex-1 items-center">
          Children:
          <input
            required={false}
            type="number"
            name="childrenCount"
            min={1}
            max={20}
            value={searhBarValues.childrenCount}
            onChange={handleChange}
            placeholder="1"
            className="focus:outline-none w-full p-1 font-bold"
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={new Date(searhBarValues.checkIn)}
          onChange={(date: Date) =>
            setSearhBarValues({ ...searhBarValues, checkIn: date })
          }
          selectsStart
          startDate={new Date(searhBarValues.checkIn)}
          endDate={new Date(searhBarValues.checkOut)}
          minDate={new Date()}
          placeholderText="Check in"
          className="w-full focus:outline-none p-2 bg-white"
          wrapperClassName="w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={new Date(searhBarValues.checkOut)}
          onChange={(date: Date) =>
            setSearhBarValues({ ...searhBarValues, checkOut: date })
          }
          selectsEnd
          startDate={new Date(searhBarValues.checkIn)}
          endDate={new Date(searhBarValues.checkOut)}
          minDate={new Date(searhBarValues.checkIn)}
          placeholderText="Check out"
          className="w-full focus:outline-none p-2 bg-white"
          wrapperClassName="w-full"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="flex-1 text-white bg-blue-500 p-2 rounded hover:bg-blue-600 text-xl font-bold">
          Search
        </button>
        <button className="flex-[0.5] text-white bg-red-500 p-2 rounded hover:bg-red-600 text-xl font-bold">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
