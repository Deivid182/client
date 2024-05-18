type Props = {
  page: number
  pages: number
  onPageChange: (page: number) => void
}
const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumber = []
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i)
  }
  return (
    <div className="flex justify-center">
      <ul className="flex gap-2">
        {pageNumber.map((number) => (
          <li
            key={number}
            className={`p-3 border border-slate-300 cursor-pointer ${page === number ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => onPageChange(number)}
          >
            <button onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination