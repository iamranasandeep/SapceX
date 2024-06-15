// src/components/Pagination.jsx

import React, { useState, useEffect } from 'react';

const Pagination = ({ missionsPerPage, totalMissions, paginate, currentPage }) => {
  const [currentSet, setCurrentSet] = useState(1);
  const pagesPerSet = 5;
  const totalPages = Math.ceil(totalMissions / missionsPerPage);
  const totalSets = Math.ceil(totalPages / pagesPerSet);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = (currentSet - 1) * pagesPerSet + 1;
  const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);
  const visiblePages = pageNumbers.slice(startPage - 1, endPage);

  const handlePreviousSet = () => {
    if (currentSet > 1) {
      setCurrentSet(currentSet - 1);
    }
  };

  const handleNextSet = () => {
    if (currentSet < totalSets) {
      setCurrentSet(currentSet + 1);
    }
  };

  useEffect(() => {
    // Adjust current set if current page is out of the visible range
    const newSet = Math.ceil(currentPage / pagesPerSet);
    setCurrentSet(newSet);
  }, [currentPage]);

  return (
    <nav className="mt-4">
      <ul className="flex justify-center items-center space-x-2">
        <li>
          <button
            onClick={handlePreviousSet}
            className={`px-3 py-1 border rounded ${currentSet === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentSet === 1}
          >
            Previous
          </button>
        </li>
        {visiblePages.map(number => (
          <li key={number} className={`mx-1 ${currentPage === number ? 'font-bold' : ''}`}>
            <button onClick={() => paginate(number)} className="px-3 py-1 border rounded">
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextSet}
            className={`px-3 py-1 border rounded ${currentSet === totalSets ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={currentSet === totalSets}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
