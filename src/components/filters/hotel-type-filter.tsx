import { hotelTypes } from "@/types";
type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const HotelTypeFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b borde-slate-300 pb-5">
      <h4 className="font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((item) => (
        <label
          key={item}
          className="flex items-center gap-3 cursor-pointer pb-1 last-of-type:pb-0"
        >
          <input
            type="checkbox"
            className="rounded"
            value={item}
            checked={selectedHotelTypes.includes(String(item))}
            onChange={onChange}
          />
          <p>{item}</p>
        </label>
      ))}
    </div>
  );
};

export default HotelTypeFilter;
