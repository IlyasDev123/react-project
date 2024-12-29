import { useEffect, useState } from 'react';
import { usePagination } from 'shared/components/context/pagination/pagination-provider';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { pagination, setPagination } = usePagination();

  useEffect(() => {
    setTotalPages(pagination.lastPage);
  }, [pagination]);

  const handlePageClick = (page) => {
    let newPage = currentPage;

    if (page === 'Next') {
      newPage = Math.min(currentPage + 1);
    } else if (page === 'Previous') {
      newPage = Math.max(currentPage - 1, 1);
    } else {
      newPage = page;
    }

    setCurrentPage(newPage);
    setPagination({ ...pagination, currentPage: newPage });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 6;

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const middle = Math.ceil(maxPages / 2);
      const rightOffset =
        currentPage + middle - 1 > totalPages
          ? totalPages - maxPages + 1
          : currentPage - middle + 1;

      for (let i = rightOffset; i < rightOffset + maxPages; i++) {
        if (i > 0) {
          // Ensure only positive page numbers are added
          pageNumbers.push(i);
        }
      }
      if (rightOffset + maxPages < totalPages) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
      if (rightOffset > 1) {
        pageNumbers.unshift(1);
        pageNumbers.unshift('...');
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="flex flex-col items-center mt-8 bg-white p-4 rounded-lg">
      <ul className="flex flex-wrap justify-center items-center space-x-3">
        <li>
          <button
            onClick={() => handlePageClick('Previous')}
            disabled={currentPage === 1}
            className="px-3 py-1 text-gray-600 bg-white border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <button className="px-2 py-1 text-gray-600 bg-white border rounded-md">
                ...
              </button>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? 'text-white bg-blue-500'
                    : 'text-gray-600 bg-white border'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageClick('Next')}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-gray-600 bg-white border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
