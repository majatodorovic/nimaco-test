import { useEffect, useState } from "react";
import { list } from "@/app/api/api";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "../../helpers/functions";
import Translated from "../../context/state";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import classes from "./DailyDeals.module.css";

import Wishlist from "../../assets/Icons/heart.png";
import ProductPrice from "../ProductPrice/ProductPrice";

const DailyDealsProduct = ({ recommendedProducts, action4 }) => {
  const [products, setProducts] = useState(recommendedProducts);
  const uniqueNames = [];
  const uniqueIds = [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const items = products?.map((item, index) => {
    return (
      <SwiperSlide
        key={item?.id}
        className={`flex-col keen-slider__slide max-w-[345px] number-slide${
          index + 1
        }`}
      >
        <div
          className={`${classes.item} relative flex items-center justify-center`}
        >
          <div className="h-[350px] ">
            {item?.categories?.length > 0 ? (
              <>
                {item?.stickers[0]?.name ? (
                  <div className="px-2 py-1 absolute top-1 left-1 bg-[#4ebdd7] w-fit text-white text-[0.8rem] ">
                    <span>{item?.stickers[0]?.name}</span>
                  </div>
                ) : null}
                <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                  <div className="h-[350px] w-[300px] relative">
                    <Image
                      src={item?.image[0]}
                      width={2222}
                      height={2222}
                      className="h-full object-cover w-full"
                      alt={item?.basic_data?.name}
                    />
                  </div>
                  {item?.image[0]?.length === 0 && (
                    <div key={"missing"}>
                      <Image
                        alt={item?.basic_data?.name}
                        className="h-full object-cover"
                        src={"/assets/Images/missingphoto.jpg"}
                        width={2222}
                        height={2222}
                      />
                    </div>
                  )}
                </Link>
              </>
            ) : null}
          </div>
          <div
            className={`${classes.more} absolute bottom-3 mx-auto hidden w-[90%] justify-center py-2 text-center bg-[#4ebdd7] text-croonus-2  max-lg:hidden`}
          >
            {item?.categories?.length > 0 ? (
              <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                <span className="">Saznajte više </span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-1 flex flex-col gap-1 lg:pl-3 max-lg:items-start max-lg:justify-start">
          {item?.categories?.length > 0 ? (
            <Link href={`/${item?.link?.link_path}`} key={item?.id}>
              <span className="font-semibold text-base text-croonus-1 hover:text-[#4ebdd7] rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem]">
                {item?.basic_data?.name}
              </span>
              <div className="min-h-[2.8rem] flex items-center">
                <span className="text-[0.9rem] flex text-[#939393] row2">
                  {item?.basic_data?.short_description}
                </span>
              </div>
            </Link>
          ) : null}
          <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex  items-center max-md:gap-1 gap-[10px] max-md:mr-auto">
            <div className="bg-[#4ebdd7] text-white max-md:text-[0.75rem] text-[0.813rem] font-bold text-center min-w-[5.938rem] max-w-[6rem]">
              <ProductPrice price={item?.price} inventory={item?.inventory} />
            </div>
            <span className="text-[0.813rem] max-md:text-[0.75rem] font-semibold text-[#818181]">
              {" "}
              {currencyFormat(item?.price?.price?.original)}
            </span>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <>
      <div className="grid grid-cols-1 gap-x-2 max-md:gap-y-5 gap-y-10 lg:mt-5 lg:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-5 lg:gap-x-12 lg:gap-y-12">
        <div className="max-lg:col-span-1 lg:col-span-4 2xl:col-span-4 4xl:col-span-5">
          <div className="relative flex flex-col justify-between max-lg:gap-5 lg:flex-row lg:items-center">
            <h1
              className={`${classes.border} text-2xl max-md:text-xl text-croonus-1 font-normal`}
            >
              {action4[0]?.title}{" "}
            </h1>
            <div className="flex flex-row max-md:hidden items-center gap-6">
              {recommendedProducts?.map((category) => {
                const uniqueCategories = category?.categories?.filter(
                  (item, index, arr) =>
                    arr.findIndex((el) => el.name === item.name) === index,
                );

                // check if category name has already been rendered
                if (uniqueNames.includes(uniqueCategories[0]?.name)) {
                  return null;
                } else {
                  uniqueNames.push(uniqueCategories[0]?.name); // add name to array
                  return (
                    <div className="" key={category.id}>
                      <button
                        className={
                          selectedCategory === uniqueCategories[0]?.id
                            ? `font-bold`
                            : `font-normal`
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          let newProducts = [...recommendedProducts];
                          newProducts = recommendedProducts?.filter((item) => {
                            return (
                              item?.categories[0]?.id ===
                              uniqueCategories[0]?.id
                            );
                          });
                          setProducts(newProducts);
                          setSelectedCategory(uniqueCategories[0]?.id);
                        }}
                      >
                        {uniqueCategories[0]?.name}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <div className="md:hidden">
              <select
                onChange={(e) => {
                  let newProducts = [...recommendedProducts];
                  newProducts = recommendedProducts?.filter((item) => {
                    return item?.categories[0]?.id === Number(e.target.value);
                  });
                  setProducts(newProducts);
                }}
                className="rounded-md bg-croonus-3 border-none bg-opacity-50 text-croonus-1 w-full"
              >
                {recommendedProducts?.map((category) => {
                  const uniqueCategories = category?.categories?.filter(
                    (item, index, arr) =>
                      arr.findIndex((el) => el.name === item.name) === index,
                  );

                  // check if category ID has already been rendered
                  if (uniqueIds.includes(uniqueCategories[0]?.id)) {
                    return null;
                  } else {
                    uniqueIds.push(uniqueCategories[0]?.id); // add ID to array
                    return (
                      <option
                        key={uniqueCategories[0]?.id}
                        value={Number(uniqueCategories[0]?.id)}
                      >
                        {uniqueCategories[0]?.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <Link
                className="text-croonus-1 hover:text-[#4ebdd7]"
                href={`/sekcija/recommendation`}
              >
                <Translated Key="view_all_products" />
              </Link>
              <div className="max-md:hidden">
                <i className="fa-solid fa-arrow-right text-croonus-1 text-lg"></i>
              </div>
            </div>
          </div>
        </div>

        <Swiper
          className="keen-slider flex gap-5 col-span-1 lg:col-span-4 4xl:col-span-5 mt-[1.625rem]"
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: products?.length > 1 ? 1.2 : 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1700: {
              slidesPerView: process.env.SLIDESPERVIEW1,
              spaceBetween: 20,
            },
          }}
        >
          {items}
        </Swiper>
      </div>
    </>
  );
};

export default DailyDealsProduct;
