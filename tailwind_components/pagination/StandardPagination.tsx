import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
  data: any[];
  count: number;
  pageSize: number;
  currentPage: number;
  setCurrentPage: any;
}

export default function StandardPagination({
  data,
  count,
  pageSize,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const [listingsPerPage] = useState(pageSize);

  const isDataUndefined = data === undefined;

  const visitPage = (page: number) => {
    setCurrentPage(page);
  };

  const previousNumber = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextNumber = async () => {
    if (currentPage !== Math.ceil(data.length)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(count / listingsPerPage); i += 1) {
    pages.push(i);
  }

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(pages.length, currentPage + 2);
  const visiblePages = pages.slice(start - 1, end);

  return (
    <div className="dark:border-dark-second flex items-center justify-between border-t border-gray-200 py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={previousNumber}
          disabled={isDataUndefined || currentPage === 1}
          className="dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={nextNumber}
          disabled={data === undefined || currentPage * pageSize >= count}
          className="dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary dark:hover:bg-dark-third relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="dark:text-dark-txt-secondary text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {Number.isFinite(currentPage) && Number.isFinite(pageSize)
                ? (currentPage - 1) * pageSize + 1
                : '...'}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {Number.isFinite(currentPage) && Number.isFinite(pageSize) && Number.isFinite(count)
                ? Math.min(count, currentPage * pageSize)
                : '...'}
            </span>{' '}
            of <span className="font-medium">{Number.isFinite(count) ? count : '...'}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate z-20 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={previousNumber}
              disabled={isDataUndefined || currentPage === 1}
              className="dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {visiblePages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => visitPage(page)}
                style={{ color: currentPage === page ? 'gray' : 'black' }}
                className="dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary dark:hover:bg-dark-third relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20"
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={nextNumber}
              disabled={isDataUndefined || currentPage * pageSize >= count}
              className="dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary dark:hover:bg-dark-third relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
