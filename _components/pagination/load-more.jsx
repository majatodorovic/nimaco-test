"use client";

export const LoadMore = ({ page, isFetching, setPage, data }) => {
  return (
    <div
      className={`flex mt-10 py-2 px-[3rem] bg-[#f2f2f2] items-center justify-center gap-1`}
    >
      <span
        className={`cursor-pointer select-none py-1 px-3 border border-white hover:border-croonus-1 hover:text-croonus-1 rounded-lg`}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        {isFetching ? "Učitavanje..." : "Učitaj još"}
      </span>
    </div>
  );
};
