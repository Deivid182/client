type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="font-semibold mb-2">Max Price</h4>
      <select
        className="w-full border border-slate-300 rounded p-2 outline-none"
        name="price"
        value={selectedPrice}
        onChange={(event) => {
          onChange(event.target.value ? parseInt(event.target.value) : undefined)
        }}
      >
        <option value="">Select a price</option>
        {[
          50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700,
          750, 800, 850, 900, 950, 1000,
        ].map((price) => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
