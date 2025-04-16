"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Thumb } from "@/_components/thumb";
import { Pagination } from "@/_components/category";
import Filters from "@/components/Filters/Filters";
import { useCategoryFilters, useCategoryProducts } from "@/hooks/nimaco.hooks";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import FilterIcon from "@/assets/Icons/filter.png";
import { CategoryLongDescription } from "@/_components/category/long-description";

export const CategoryProducts = ({
  filters = [],
  strana = 1,
  sortDirection,
  sortField,
  allFilters = [],
  slug,
  section,
}) => {
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  //params iz URL-a
  const filterKey = params?.get("filteri");
  const pageKey = Number(params?.get("strana"));
  const sortKey = params?.get("sort");

  const [page, setPage] = useState(Number(pageKey) ?? 1);

  const [sort, setSort] = useState({
    field: sortField ?? "",
    direction: sortDirection ?? "",
  });

  const [selectedFilters, setSelectedFilters] = useState(filters ?? []);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState(allFilters ?? []);
  const [changeFilters, setChangeFilters] = useState(false);
  const [lastSelectedFilterKey, setLastSelectedFilterKey] = useState("");

  // azuriramo query parametre sa selektovanim sortom, stranicom i filterima
  const updateURLQuery = (sort, selectedFilters, page) => {
    let sort_tmp;
    let filters_tmp;
    let page_tmp;
    if (sort?.field !== "" && sort?.direction !== "") {
      sort_tmp = `${sort?.field}_${sort?.direction}`;
    }

    if (selectedFilters?.length > 0) {
      filters_tmp = selectedFilters?.map((filter) => {
        const selectedValues = filter?.value?.selected?.join("_");
        return `${filter?.column}=${selectedValues}`;
      });
    } else {
      filters_tmp = "";
    }

    if (page) {
      page_tmp = page;
    }

    return { sort_tmp, filters_tmp, page_tmp };
  };

  const generateQueryString = (sort_tmp, filters_tmp, page_tmp) => {
    let queryString = `?${filters_tmp ? `filteri=${filters_tmp}` : ""}${
      filters_tmp && (sort_tmp || page_tmp) ? "&" : ""
    }${sort_tmp ? `sort=${sort_tmp}` : ""}${sort_tmp && page_tmp ? "&" : ""}${
      page_tmp > 1 ? `strana=${page_tmp}` : ""
    }`;

    router.push(queryString, { scroll: false });
    return queryString;
  };

  useEffect(() => {
    const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
      sort,
      selectedFilters,
      page
    );

    generateQueryString(sort_tmp, filters_tmp, page_tmp);
  }, [sort, selectedFilters, page]);

  //dobijamo proizvode za kategoriju sa api-ja
  const { data, error, isError, isFetching, isFetched } = useCategoryProducts({
    slug,
    page: page,
    limit: 12,
    sort: sortKey ?? "_",
    setSelectedFilters: setSelectedFilters,
    filterKey: filterKey,
    setSort: setSort,
    render: false,
    section: section,
  });

  const mutateFilters = useCategoryFilters({
    slug,
    page,
    limit: 10,
    sort,
    selectedFilters: tempSelectedFilters,
    section: section,
  });

  //ako je korisnik dosao na stranicu preko linka sa prisutnim filterima u URL,onda se ti filteri selektuju i okida se api da azurira dostupne filtere
  useEffect(() => {
    if (filters?.length > 0) {
      mutateFilters.mutate({
        slug,
        selectedFilters: tempSelectedFilters,
        lastSelectedFilterKey,
        setAvailableFilters,
        availableFilters,
        section: section,
      });
    }
  }, []);

  //okidamo api za filtere na promenu filtera
  useEffect(() => {
    mutateFilters.mutate({
      slug,
      selectedFilters: tempSelectedFilters,
      lastSelectedFilterKey,
      setAvailableFilters,
      availableFilters,
      section: section,
    });
  }, [tempSelectedFilters?.length]);

  const renderedItems = useMemo(() => {
    return data?.items?.map(({ id }) => (
      <Suspense
        key={id}
        fallback={
          <div
            className={`col-span-1 w-full min-w-0 h-full aspect-2/3 bg-slate-300 animate-pulse`}
          ></div>
        }
      >
        <Thumb id={id} refetchWishlist={() => {}} categoryId={slug} />
      </Suspense>
    ));
  }, [data?.items]);

  const getPaginationArray = (selectedPage, totalPages) => {
    const start = Math.max(1, selectedPage - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <>
      <div
        className="w-[95%] mx-auto border-2 max-md:border max-md:h-[40px] md:hidden h-[50px] border-[#171717] flex items-center md:gap-[30px] px-[14px] cursor-pointer ml-auto"
        onClick={() => setOpenFilter(true)}
      >
        <Image src={FilterIcon} alt="Filter" width={20} height={20} />
        <p className="uppercase max-md:pl-4 font-bold text-[13.74px] text-[#191919]">
          Filteri
        </p>
      </div>

      <div
        className={
          openFilter
            ? `fixed overflow-y-auto flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-2xl translate-x-0 transition-all duration-500 h-screen max-md:w-screen w-[33%] rounded-l-[40px]`
            : `
      fixed flex flex-col justify-between z-[6000] top-0 right-0 bg-white shadow-2xl translate-x-full transition-all duration-500 h-screen w-[33%] rounded-l-[40px]`
        }
      >
        <div>
          <div className="border-l-0 border-t-0 border-r-0 border-b border-b-[#ededed] py-[1.563rem] flex justify-between pr-6">
            <p className="text-[#191919] pl-6 text-[20px] font-bold">Filteri</p>
            <button
              onClick={() => {
                setOpenFilter(false);
              }}
              className="text-xl"
            >
              X
            </button>
          </div>
          <div className="mx-[1.25rem] mt-[1.245rem] max-h-full h-full">
            <Filters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              availableFilters={availableFilters}
              changeFilters={changeFilters}
              setTempSelectedFilters={setTempSelectedFilters}
              tempSelectedFilters={tempSelectedFilters}
              setChangeFilters={setChangeFilters}
              setSort={setSort}
              sort={sort}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 md:mx-[5rem]">
        <div className="col-span-1 max-md:hidden">
          <div>
            <div className="border-l-0 border-t-0 border-r-0 border-b border-b-[#ededed] py-[1.563rem]">
              <p className="text-[#191919] pl-6 text-[20px] font-bold">
                Filteri
              </p>
            </div>
            <div className="mx-[1.25rem] mt-[1.245rem] max-h-full h-full">
              <Filters
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                availableFilters={availableFilters}
                changeFilters={changeFilters}
                setTempSelectedFilters={setTempSelectedFilters}
                tempSelectedFilters={tempSelectedFilters}
                setChangeFilters={setChangeFilters}
                setSort={setSort}
                sort={sort}
                setPage={setPage}
              />
            </div>
          </div>
          <div className=" bg-white border-t border-t-[#ededed]">
            <div className="mx-[1.25rem] py-[2.813rem] flex gap-[20px] items-center">
              <button
                className="w-[7.625rem] h-[3.188rem] text-sm font-bold border border-[#191919] text-[#191919] uppercase flex items-center justify-center text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedFilters([]);
                  setTempSelectedFilters([]);
                  setChangeFilters(true);
                }}
              >
                Obriši
              </button>
              <button
                className="w-[237px] h-[3.188rem] text-sm font-bold border bg-croonus-3 text-white uppercase flex items-center justify-center text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedFilters(tempSelectedFilters);
                  setChangeFilters(true);
                  setOpenFilter(false);
                }}
              >
                Prikaži rezultate ({data.pagination?.total_items})
              </button>
            </div>
          </div>
        </div>
        <div className="max-md:col-span-4 col-span-3">
          <div className="mx-[0.4rem] md:mx-[4rem] mt-[4.125rem]">
            <div className="grid grid-cols-2 gap-y-[40px] lg:grid-cols-3 3xl:grid-cols-4 gap-x-[20px]">
              {renderedItems}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        pagination={data?.pagination}
        generateQueryString={() => {
          const { sort_tmp, filters_tmp, page_tmp } = updateURLQuery(
            sort,
            selectedFilters,
            page
          );
          return generateQueryString(sort_tmp, filters_tmp, page_tmp);
        }}
        data={data}
        page={page}
        slug={slug}
        setPage={setPage}
        getPaginationArray={getPaginationArray}
      />
      <CategoryLongDescription slug={slug} />
    </>
  );
};
