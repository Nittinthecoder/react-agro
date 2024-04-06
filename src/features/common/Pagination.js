import { ITEMS_PER_PAGE } from "../../app/constants";

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function Pagination({ page, setPage, handlePage, totalItems }) {
    return (
      <div className="flex relative bottom-[-25px] items-center justify-between border-t border-gray-200 bg-secondary px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-md text-text">
              Showing{" "}
              <span className="font-semibold">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold">
                {page * ITEMS_PER_PAGE < totalItems
                  ? page * ITEMS_PER_PAGE
                  : totalItems}
              </span>{" "}
              of <span className="font-semibold">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
  
              {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map(
                (el, index) => (
                  <div
                    onClick={(e) => handlePage(index + 1)}
                    aria-current="page"
                    className={`relative cursor-pointer z-10 inline-flex items-center ${
                      index + 1 === page ? "bg-text text-white" : "text-text"
                    } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    );
  }