"use client";

import Link from "next/link";

export const Pagination = ({
  pagination,
  page,
  setPage,
  getPaginationArray,
  className,
  data,
  slug,
  generateQueryString,
}) => {
  let query_string = generateQueryString();

  const handleQueryString = (page) => {
    let new_string = query_string;
    let page_string = query_string?.split("strana=")?.[1];

    if (page_string) {
      new_string = query_string?.replace(
        `strana=${page_string}`,
        `strana=${page + 1}`
      );
    }

    if (!page_string) {
      new_string = `${query_string}&strana=${page + 1}`;
    }
    return new_string;
  };

  return (
    <div
      className={`mt-10 flex items-center justify-end gap-2 bg-[#f6f8f9] max-md:px-2 md:px-[7rem] py-2`}
    >
      {getPaginationArray(
        pagination?.selected_page,
        pagination?.total_pages
      ).map((num, index, array) => (
        <>
          {index === 0 && num !== 1 && (
            <>
              <Link
                href={`${handleQueryString(0)}`}
                className={`${className} cursor-pointer select-none rounded-lg border border-croonus-3 px-3 py-1 font-light hover:border-croonus-3 hover:bg-croonus-3 hover:text-white max-sm:text-[1.2rem]`}
                onClick={() => {
                  setPage(1);
                  window.scrollTo(0, 0);
                }}
              >
                1
              </Link>
              {num - 1 !== 1 && (
                <span
                  className={`${className} select-none rounded-lg px-3 py-1 font-light max-sm:text-[1.2rem]`}
                >
                  ...
                </span>
              )}
            </>
          )}
          {index > 0 && num - array[index - 1] > 1 && (
            <span
              className={`${className} select-none rounded-lg px-3 py-1 font-light max-sm:text-[1.2rem]`}
            >
              ...
            </span>
          )}
          <Link
            href={`${handleQueryString(num - 1)}`}
            className={`${
              num === pagination.selected_page
                ? `${className} cursor-pointer select-none rounded-lg border border-croonus-3 bg-croonus-3 px-3 py-1 font-light text-white max-sm:text-[1.2rem]`
                : `${className} cursor-pointer select-none rounded-lg border border-croonus-3 px-3 py-1 font-light hover:border-croonus-3 hover:bg-croonus-3 hover:text-white max-sm:text-[1.2rem]`
            }`}
            onClick={() => {
              setPage(num);
              window.scrollTo(0, 0);
            }}
          >
            {num}
          </Link>
          {index === array.length - 1 && num !== pagination.total_pages && (
            <>
              {pagination.total_pages - num !== 1 && (
                <span
                  className={`${className} select-none rounded-lg px-3 py-1 font-light max-sm:text-[1.2rem]`}
                >
                  ...
                </span>
              )}
              <Link
                href={`${handleQueryString(pagination.total_pages - 1)}`}
                className={`${className} cursor-pointer select-none rounded-lg border border-croonus-3 px-3 py-1 font-light hover:border-croonus-3 hover:bg-croonus-3 hover:text-white max-sm:text-[1.2rem]`}
                onClick={() => {
                  setPage(pagination.total_pages);
                  window.scrollTo(0, 0);
                }}
              >
                {pagination.total_pages}
              </Link>
            </>
          )}
        </>
      ))}
    </div>
  );
};
