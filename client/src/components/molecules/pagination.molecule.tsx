type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-4 py-2 border ${
          currentPage === i ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
        }`}
      >
        {i}
      </button>
    );
  }

  return <div className="flex space-x-2">{pages}</div>;
};

export default Pagination;
