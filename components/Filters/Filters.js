import Filter from "../Filter/Filter";
import { useState } from "react";
import { sortKeys } from "@/helpers/const";
const Filters = ({
  selectedFilters,
  setSelectedFilters,
  availableFilters,
  changeFilters,
  setTempSelectedFilters,
  setChangeFilters,
  tempSelectedFilters,
  sort,
  setSort,
  setPage,
}) => {
  const [openIndex, setOpenIndex] = useState({ key: null });
  const [activeSort, setActiveSort] = useState({ label: "" });
  const [sortingActive, setSortingActive] = useState(false);
  return (
    <>
      <div className="h-full ">
        <div className="flex flex-col border-b border-b-[#f5f5f5] py-[23px] overflow-hidden">
          <div
            className="flex flex-row justify-between cursor-pointer items-center"
            onClick={() => setSortingActive(!sortingActive)}
          >
            <p className="text-[0.938rem] font-bold">Sortiranje</p>
            <div className="flex items-center cursor-pointer">
              <p className="text-[#171717] font-bold">
                {sortingActive ? "-" : "+"}
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <div
              className={
                sortingActive
                  ? `mt-0 transition-all py-[20px] duration-[750ms] flex flex-row gap-[11px] flex-wrap`
                  : `flex transition-all py-[20px] duration-[750ms] flex-row gap-[11px] flex-wrap md:-mt-[16rem] 3xl:-mt-[9rem]`
              }
            >
              {sortKeys?.map((item, index) => {
                const isActive = activeSort?.label === item?.label;
                return (
                  <div
                    key={index}
                    className={
                      isActive
                        ? `px-3 select-none border-2 border-croonus-1 cursor-pointer py-[10px] font-medium rounded-lg bg-croonus-1 text-white`
                        : `px-3 select-none cursor-pointer py-[10px] border-2 rounded-lg border-[#e8e8e8]`
                    }
                    onClick={() => {
                      setActiveSort({
                        label:
                          activeSort?.label === item?.label
                            ? null
                            : item?.label,
                      });
                      setSort({
                        field: item?.field,
                        direction: item?.direction,
                      });
                    }}
                  >
                    <p className="font-light text-[13px]">{item?.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {availableFilters?.map((filter, index) => {
          const isOpen = openIndex.key === filter.key;
          return (
            <>
              <div
                className="flex cursor-pointer py-[1.375rem] select-none border-b border-b-[#f5f5f5] items-center justify-between"
                onClick={() =>
                  setOpenIndex({
                    key: openIndex?.key === filter?.key ? null : filter?.key,
                  })
                }
                key={filter?.key}
              >
                <p className="text-[0.938rem] font-bold">
                  {filter?.attribute?.name}
                </p>
                <div>
                  <p className={`text-[#171717] font-bold `}>
                    {isOpen ? `-` : `+`}
                  </p>
                </div>
              </div>
              <div className="overflow-hidden">
                <div className={isOpen ? `block` : `hidden`}>
                  <Filter
                    setPage={setPage}
                    filter={filter}
                    selectedFilters={selectedFilters}
                    setTempSelectedFilters={setTempSelectedFilters}
                    changeFilters={changeFilters}
                    setChangeFilters={setChangeFilters}
                    setSelectedFilters={setSelectedFilters}
                    tempSelectedFilters={tempSelectedFilters}
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Filters;
