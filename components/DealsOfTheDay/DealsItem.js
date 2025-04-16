import { useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "../../helpers/functions";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classes from "./DealsItem.module.css";
import "keen-slider/keen-slider.min.css";

import Wishlist from "../../assets/Icons/heart.png";
import ProductPrice from "../ProductPrice/ProductPrice";

const DealsItem = ({ products = [], action4 }) => {
  const globalAddToWishlist = useGlobalAddToWishList();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 4,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 1.2,
          spacing: 20,
        },
      },
      "(min-width:1024px)": {
        slides: {
          perView: 4,
          spacing: 20,
        },
      },
      "(min-width:1440px)": {
        slides: {
          perView: 5,
          spacing: 30,
        },
      },
      "(min-width:1680px)": {
        slides: {
          perView: 5,
          spacing: 30,
        },
      },
    },
    loop: false,
  });
  const items = products?.map((item, index) => {
    return (
      <div
        key={item?.id}
        className={`slider border border-[#ecebe5] hover:border-[#d0cec8] transition-all ease p-2 md:p-5 bg-white rounded-md col-span-1  flex-col keen-slider__slide number-slide${
          index + 1
        }`}
      >
        <div
          className={`${classes.item} relative flex items-center justify-center `}
        >
          <div className="h-[240px]">
            {item?.categories?.length > 0 ? (
              <>
                {item?.stickers[0]?.name ? (
                  <div className="px-2 py-1 absolute top-1 left-1 bg-[#4ebdd7] w-fit text-white text-[0.8rem] ">
                    <span>{item?.stickers[0]?.name}</span>
                  </div>
                ) : null}
                <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                  {item?.image[0]?.toString() && (
                    <Image
                      src={item?.image[0]?.toString()}
                      width={2222}
                      height={2222}
                      className="h-full object-contain"
                      alt={item?.basic_data?.name}
                    />
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

        <div className="mt-1 flex flex-col gap-1 max-lg:items-start max-lg:justify-start">
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
          <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex items-center justify-center max-md:gap-1 gap-[10px] max-md:mr-auto bg-croonus-3 rounded-md py-1 w-full">
            <div className={`px-2 font-bold text-center`}>
              <ProductPrice price={item?.price} inventory={item?.inventory} />
            </div>
            {item?.price?.discount?.active && (
              <span className={`line-through`}>
                {currencyFormat(item?.price?.price?.original)}
              </span>
            )}
          </div>
          <div
            className={`${classes.more} mx-auto lg:hidden rounded-md w-full justify-center py-2 text-center bg-[#4ebdd7] text-croonus-2  mt-1`}
          >
            {item?.categories?.length > 0 ? (
              <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                <span className="">Saznajte više </span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div
        className="
    ]
     h-full "
      >
        {/* {products?.length > 4 && (
          <div className="flex flex-row gap-5 divide-x divide-x-2 divide-[#4ebdd7] mt-8">
            <i
              className="fa-solid fa-arrow-left text-[#4ebdd7] text-base cursor-pointer"
              onClick={() => instanceRef.current.prev()}
            ></i>
            <i
              className="fa-solid fa-arrow-right pl-5 text-[#4ebdd7] text-base cursor-pointer"
              onClick={() => instanceRef.current.next()}
            ></i>
          </div>
        )} */}
      </div>
      <div
        ref={sliderRef}
        className="slider keen-slider grid md:col-span-2 lg:col-span-4 4xl:col-span-5 4xl:grid-cols-5 "
      >
        {items}
      </div>
    </>
  );
};

export default DealsItem;
