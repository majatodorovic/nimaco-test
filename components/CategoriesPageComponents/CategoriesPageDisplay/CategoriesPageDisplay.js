"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import FilterIcon from "../../../assets/Icons/filter.png";
import Thumb from "../Products/Products";
import { list, post } from "@/app/api/api";
import Filters from "../../Filters/Filters";
import Layout from "@/components/UI/Layout";
import Breadcrumbs from "../../../helpers/generateBreadCrumbsServer";

const CategoryPage = ({
  filter,
  singleCategory,
  productsFromSection,
  slug,
}) => {
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);
  const [openFilter, setOpenFilter] = useState(false);
  const [productData, setProductData] = useState({
    products: [],
    pagination: {},
  });

  const [sort, setSort] = useState({ field: "", direction: "" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [availableFilters, setAvailableFilters] = useState(filter);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [changeFilters, setChangeFilters] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async (limit, page, sort, selectedFilters) => {
      if (!productsFromSection && !slug) {
        const getProductList = await list(
          `/products/category/list/${singleCategory?.id}`,
          {
            limit: limit,
            sort: sort,
            page: page,
            filters: selectedFilters,
            render: false,
          }
        ).then((res) => {
          setProductData({
            products: res?.payload?.items,
            pagination: res?.payload?.pagination,
          });

          setLoading(false);
        });
        return getProductList;
      } else {
        const getProductList = await list(`/products/section/list/${slug}`, {
          limit: limit,
          sort: sort,
          page: page,
          filters: selectedFilters,
        }).then((res) => {
          setProductData({
            products: res?.payload?.items,
            pagination: res?.payload?.pagination,
          });

          setLoading(false);
        });
        return getProductList;
      }
    };
    getProducts(limit, page, sort, selectedFilters);
  }, [limit, sort, page, selectedFilters]);

  useEffect(() => {
    if (changeFilters && productsFromSection?.length === 0 && !slug) {
      post(`/products/category/filters/${singleCategory?.id}`, {
        filters: tempSelectedFilters,
      }).then((response) => {
        setAvailableFilters(response?.payload);
      });
    } else {
      if (changeFilters && productsFromSection?.length !== 0 && slug) {
        post(`/products/section/filters/${slug}`, {
          filters: tempSelectedFilters,
        }).then((response) => {
          setAvailableFilters(response?.payload);
        });
      }
    }
    setChangeFilters(false);
  }, [changeFilters]);

  return (
    <>
      <div className="bg-croonus-3 py-4">
        <Layout>
          <div className="flex flex-row max-md:flex-col md:items-center md:justify-between max-md:gap-3">
            <Breadcrumbs />
          </div>
        </Layout>
      </div>
      <div
        className={`4xl:container mx-auto ${
          productData?.products?.length > 0 ? `mb-[4rem]` : `mb-[25rem]`
        } `}
      >
        <div className="px-[3%] md:px-[5rem] max-md:mt-[2rem] mt-[4rem] mb-[4rem] flex max-md:flex-col md:items-center justify-between">
          <h1 className="font-bold text-[26px] max-md:text-[1rem] text-[#191919]">
            {singleCategory?.basic_data?.name ??
              "Proizvodi iz izabrane sekcije"}
          </h1>
          <div
            className="border-2 max-md:border  max-md:h-[40px] md:hidden h-[50px] border-[#171717] flex items-center md:gap-[30px] px-[14px] cursor-pointer ml-auto"
            onClick={() => setOpenFilter(true)}
          >
            <Image src={FilterIcon} alt="Filter" width={20} height={20} />
            <h1 className="uppercase max-md:pl-4 font-bold text-[13.74px] text-[#191919]">
              Filteri
            </h1>
          </div>
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
              <p className="text-[#191919] pl-6 text-[20px] font-bold">
                Filteri
              </p>
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
                  Prikaži rezultate ({productData.pagination?.total_items})
                </button>
              </div>
            </div>
          </div>
          <div className="max-md:col-span-4 col-span-3">
            <div className="mx-[0.4rem] md:mx-[4rem] mt-[4.125rem]">
              <div className="grid max-md:grid-cols-2 gap-y-[40px] grid-cols-3 3xl:grid-cols-4 gap-x-[20px]">
                {loading ? (
                  <div className="h-full col-span-1 w-full bg-[#eeeee0] object-cover animate-pulse"></div>
                ) : (
                  <Thumb
                    data={productData?.products ?? productsFromSection}
                    slider={false}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
