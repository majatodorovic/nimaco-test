"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Chevron from "../../../assets/Icons/right-chevron.png";
import Wishlist from "../../../assets/Icons/heart.png";
import { useGlobalAddToWishList } from "@/app/api/globals";
import { ToastContainer, toast } from "react-toastify";
import { currencyFormat } from "@/helpers/functions";
import classes from "./ProductsItem.module.css";
import ProductPrice from "@/components/ProductPrice/ProductPrice";

const Thumb = ({ data, slider, loading }) => {
  if (slider) {
    const addToWishlist = useGlobalAddToWishList();

    const imageIndexes = data?.map(() => useState(0)); // Create array of image index states
    const products = data?.map((product, index) => {
      const [imageIndex, setImageIndex] = imageIndexes[index]; // Access the correct state for the current product
      return (
        <SwiperSlide key={product?.basic_data?.id} className="">
          <div className="w-full item">
            {" "}
            <div
              className={`${classes.item} max-md:h-[250px] flex items-center justify-center md:h-[450px] lg:h-[575px] relative`}
            >
              {product?.image[0] && (
                <Link
                  href={`/${product?.link?.link_path}`}
                  scroll={true}
                  className="relative z-[5]"
                >
                  {" "}
                  <Image
                    src={convertHttpToHttps(product?.image[imageIndex])}
                    alt={product?.basic_data?.name}
                    width={22000}
                    height={22000}
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    loading="lazy"
                  />{" "}
                </Link>
              )}

              {product?.stickers[0]?.name ? (
                <div className="px-2 py-1 absolute top-1 left-1 bg-croonus-3 w-fit text-white text-[0.8rem] ">
                  <span>{product?.stickers[0]?.name}</span>
                </div>
              ) : null}
              {product?.price?.discount?.active && (
                <div
                  className={`absolute -left-1 -top-1 z-[10] text-white text-[13px]`}
                >
                  <div className={`bg-[#044e7b] px-2 py-3 rounded-full `}>
                    -
                    {(
                      ((product?.price?.price?.original -
                        product?.price?.price?.discount) /
                        product?.price?.price?.original) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
              )}
              <div className="absolute max-md:hidden z-[5] px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
                <div>
                  <Image
                    className="cursor-pointer rotate-180"
                    src={Chevron}
                    alt="chevron"
                    width={15}
                    height={15}
                    onClick={() => {
                      if (imageIndex === 0) {
                        setImageIndex(product?.image.length - 1);
                      } else {
                        setImageIndex(imageIndex - 1);
                      }
                    }}
                  />
                </div>
                <div>
                  <Image
                    className="cursor-pointer rotate-0"
                    src={Chevron}
                    alt="chevron"
                    width={15}
                    height={15}
                    onClick={() => {
                      if (imageIndex === product?.image.length - 1) {
                        setImageIndex(0);
                      } else {
                        setImageIndex(imageIndex + 1);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute z-[100] rounded-lg py-5 left-3 bottom-[4rem] w-[95%] mx-auto bg-white chevrons">
              <div className="flex flex-col items-center justify-center w-full">
                {/* <h1 className="text-[0.938rem] font-semibold text-center">
                  Izaberi veličinu
                </h1> */}
                <div className="flex flex-row items-center justify-center gap-3 w-full mt-2">
                  {product?.variant_options?.length > 0 ? (
                    <>
                      {product?.variant_options?.slice(0, 1).map((item2) => {
                        return (
                          <>
                            {item2?.values.map((item3) => {
                              return (
                                <>
                                  <div className="rounded-full cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border">
                                    {item3?.name}
                                  </div>
                                </>
                              );
                            })}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="mt-[0.813rem] max-md:text-left flex max-md:items-start items-center justify-between relative z-[50]">
              <Link
                href={`/${product?.link?.link_path}`}
                scroll={true}
                className="relative z-[5]"
              >
                <span className="font-semibold text-base text-croonus-1 hover:text-croonus-3 rows2 max-md:text-[0.85rem] max-md:leading-4 mt-[1rem]">
                  {product?.basic_data?.name}
                </span>

                <div className="md:min-h-[2.8rem] flex items-center">
                  <span className="text-[0.9rem] flex text-[#939393] row2">
                    {product?.basic_data?.short_description}
                  </span>
                </div>
              </Link>
            </div>
            <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex items-center justify-center max-md:gap-1 gap-[10px] max-md:mr-auto bg-croonus-3 rounded-md py-1">
              <div className={`px-2 font-bold text-center`}>
                <ProductPrice
                  price={product?.price}
                  inventory={product?.inventory}
                />
              </div>
              {product?.price?.discount?.active && (
                <span
                  className={`max-md:text-[#877372] line-through text-[13px]`}
                >
                  {currencyFormat(product?.price?.price?.original)}
                </span>
              )}
            </div>
          </div>
        </SwiperSlide>
      );
    });

    return (
      <>
        <ToastContainer />
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          fadeEffect={{ crossFade: true }}
          loop={true}
          className="mySwiper w-full select-none"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1880: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {products}
        </Swiper>
      </>
    );
  } else {
    // const imageIndexes = data?.map(() => useState(0));

    const addToWishlist = useGlobalAddToWishList();
    const products = data?.map((product, index) => {
      // const [imageIndex, setImageIndex] = imageIndexes[index];
      return (
        <div className="col-span-1 relative item border border-[#ecebe5] hover:border-[#d0cec8] transition-all ease p-2 md:p-5 rounded-md">
          <div
            className={`${classes.item} max-md:h-[240px] md:h-[280px] lg:h-[320px] item relative`}
          >
            {loading ? (
              <div className="h-full w-full bg-[#eeeee0] object-cover animate-pulse"></div>
            ) : (
              product?.image[0] && (
                <Link href={`/${product?.link?.link_path}`} scroll={true}>
                  <Image
                    src={convertHttpToHttps(product?.image[0])}
                    alt={product?.basic_data?.name}
                    width={22000}
                    height={22000}
                    className={`transition-all duration-200 opacity-100 object-cover w-full h-full`}
                    loading="lazy"
                  />
                </Link>
              )
            )}

            <div
              className={`${classes.more} absolute bottom-[0.1rem] mx-auto hidden w-[100%] justify-center py-2 text-center bg-croonus-3 text-croonus-2 max-lg:hidden z-50`}
            >
              {product?.categories?.length > 0 ? (
                <Link href={`/${product?.link?.link_path}`} key={product?.id}>
                  <span className="">Saznajte više </span>
                </Link>
              ) : null}
            </div>
            {product?.stickers[0]?.name ? (
              <div className="px-2 py-1 absolute top-1 left-1 bg-croonus-3 w-fit text-white text-[0.8rem] ">
                <span>{product?.stickers[0]?.name}</span>
              </div>
            ) : null}
            {product?.price?.discount?.active && (
              <div
                className={`absolute -left-1 -top-1 z-[10] text-white text-[13px]`}
              >
                <div className={`bg-[#044e7b] px-2 py-3 rounded-full `}>
                  -
                  {(
                    ((product?.price?.price?.original -
                      product?.price?.price?.discount) /
                      product?.price?.price?.original) *
                    100
                  ).toFixed(0)}
                  %
                </div>
              </div>
            )}
          </div>
          {/* <div className="absolute  px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
            <div>
              <Image
                className="cursor-pointer rotate-180"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === 0) {
                    setImageIndex(product?.image.length - 1);
                  } else {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              />
            </div>
            <div>
              <Image
                className="cursor-pointer rotate-0"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === product?.image.length - 1) {
                    setImageIndex(0);
                  } else {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              />
            </div>
          </div> */}
          {/* {product?.variant_options?.length > 0 ? (
          <div className="absolute rounded-lg py-5 left-3 bottom-[4rem] w-[95%] mx-auto bg-white chevrons">
          
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-[0.938rem] font-semibold text-center">
                Izaberi veličinu
              </h1>
              <div className="flex flex-row items-center justify-center gap-3 w-full mt-2">
                
                  <>
                    {product?.variant_options?.slice(0, 1).map((item2) => {
                      return (
                        <>
                          {item2?.values.map((item3) => {
                            return (
                              <>
                                <div className="rounded-full cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border">
                                  {item3?.name}
                                </div>
                              </>
                            );
                          })}
                        </>
                      );
                    })}
                  </>
                
              </div>
            </div>
          </div>)  : null} */}
          <div className={`${classes.item} flex-col flex relative z-[50]`}>
            <span className="font-semibold text-base text-croonus-1 hover:text-croonus-3 rows2 max-md:text-[0.85rem] max-md:leading-4 mt-[1rem]">
              {product?.basic_data?.name}
            </span>

            <div className="md:min-h-[2.8rem] flex items-center">
              <span className="text-[0.9rem] flex text-[#939393] row2">
                {product?.basic_data?.short_description}
              </span>
            </div>
          </div>
          <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex items-center justify-center max-md:gap-1 gap-[10px] max-md:mr-auto bg-croonus-3 rounded-md py-1">
            <div className={`px-2 font-bold text-center`}>
              <ProductPrice
                price={product?.price}
                inventory={product?.inventory}
              />
            </div>
            {product?.price?.discount?.active && (
              <span
                className={`max-md:text-[#877372] line-through text-[13px]`}
              >
                {currencyFormat(product?.price?.price?.original)}
              </span>
            )}
          </div>
          <div
            className={`${classes.more} mx-auto lg:hidden w-[100%] justify-center py-2 text-center bg-croonus-3 text-croonus-2 z-50 rounded-md mt-2`}
          >
            {product?.categories?.length > 0 ? (
              <Link href={`/${product?.link?.link_path}`} key={product?.id}>
                <span className="">Saznajte više </span>
              </Link>
            ) : null}
          </div>
        </div>
      );
    });
    return (
      <>
        {products}
        <ToastContainer />
      </>
    );
  }
};

export default Thumb;
