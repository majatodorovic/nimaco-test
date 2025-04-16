import { useState } from "react";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { useRouter } from "next/navigation";
import { currencyFormat } from "../../helpers/functions";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import classes from "./RelatedProducts.module.css";
import "keen-slider/keen-slider.min.css";

import Wishlist from "../../assets/Icons/heart.png";

const RelatedProducts = ({ relatedProducts = [] }) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

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
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const items = relatedProducts?.map((item, index) => {
    return (
      <div
        key={item?.id}
        className={`slider col-span-1  flex-col keen-slider__slide number-slide${
          index + 1
        }`}
      >
        <div
          className={`${classes.item} relative flex items-center justify-center`}
        >
          <div className="h-[350px] relative">
            {item?.categories?.length > 0 ? (
              <>
                {item?.stickers[0]?.name ? (
                  <div className="px-2 py-1 absolute top-1 left-1 bg-croonus-3 w-fit text-white text-[0.8rem] ">
                    <span>{item?.stickers[0]?.name}</span>
                  </div>
                ) : null}
                <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                  {item?.image[0]?.toString() && (
                    <Image
                      src={item?.image[0]?.toString()}
                      width={2222}
                      height={2222}
                      className="h-full object-cover"
                      alt={item?.basic_data?.name}
                    />
                  )}
                </Link>
              </>
            ) : null}
          </div>
          <div
            className={`${classes.more} absolute bottom-3 mx-auto hidden w-[90%] justify-center py-2 text-center bg-croonus-3 text-croonus-2  max-lg:hidden`}
          >
            {item?.categories?.length > 0 ? (
              <Link href={`/${item?.link?.link_path}`} key={item?.id}>
                <span className="">Saznajte više </span>
              </Link>
            ) : null}
          </div>
          {/* <div className="absolute top-2 left-2 rounded-full bg-croonus-3 bg-opacity-80 hover:bg-opacity-40">
            <Image
              src={Wishlist}
              height={32}
              width={32}
              alt="Nimaco"
              className={`p-[4px]`}
              onClick={() => {
                addToWishlist(item?.id);
              }}
            />
          </div> */}
        </div>

        <div className="mt-1 flex flex-col gap-1 lg:pl-3 max-lg:items-center max-lg:justify-center">
          {item?.categories?.length > 0 ? (
            <Link href={`/${item?.link?.link_path}`} key={item?.id}>
              <span className="font-semibold text-base text-croonus-1 hover:text-croonus-3 rows2 max-md:text-[0.85rem] max-md:leading-4 row1 mt-[1rem]">
                {item?.basic_data?.name}
              </span>
              <div className="min-h-[2.8rem] flex items-center">
                <span className="text-[0.9rem] flex text-[#939393] row2">
                  {item?.basic_data?.short_description}
                </span>
              </div>
            </Link>
          ) : null}
          <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex max-md:mr-auto items-center max-md:gap-1 gap-[10px]">
            <h1 className="bg-[#f8ce5d] max-md:text-[0.75rem] text-[0.813rem] font-bold text-center min-w-[5.938rem] max-w-[6rem]">
              {currencyFormat(item?.price?.price?.original)}
            </h1>
            <span className="text-[0.813rem] max-md:text-[0.75rem] font-semibold text-[#818181]">
              {" "}
              {currencyFormat(item?.price?.price?.original)}
            </span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="relative col-span-2 md:col-span-1 flex flex-col justify-center gap-5  lg:col-span-1">
        <h1 className={`${classes.border} text-2xl font-bold`}>
          Možda će vas zanimati{" "}
        </h1>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-x-3 max-lg:gap-y-5 lg:grid-cols-4 2xl:grid-cols-4 4xl:grid-cols-5"></div>
      <div
        ref={sliderRef}
        className="slider keen-slider grid md:col-span-4 lg:col-span-3 4xl:col-span-4 4xl:grid-cols-5 mt-[1.625rem] mb-[2rem]"
      >
        {items}
      </div>
    </>
  );
};

export default RelatedProducts;
