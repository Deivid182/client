
type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b borde-slate-300 pb-5">
      <h4 className="font-semibold mb-2">Property Rating</h4>
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          className="flex items-center gap-3 cursor-pointer pb-1 last-of-type:pb-0"
        >
          <input
            type="checkbox"
            className="rounded"
            name="rating"
            value={star}
            checked={selectedStars.includes(String(star))}
            onChange={onChange}
          />
          <p>{star} stars</p>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
