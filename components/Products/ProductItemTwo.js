"use client";
import { useEffect, useState } from "react";
import { list } from "@/app/api/api";
import { currencyFormat } from "@/helpers/functions";
import Link from "next/link";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import Translated from "../../context/state";
import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper";
import ProductPrice from "../ProductPrice/ProductPrice";
const ProductItemTwo = ({
  recommendedCategories2,
  indexBanner2,
  action2,
  actionProducts,
}) => {
  const [swiper, setSwiper] = useState(null);
  const onSwiperLeftClick = () => {
    swiper.slidePrev();
  };
  const onSwiperRightClick = () => {
    swiper.slideNext();
  };
  const items = actionProducts?.map((item) => {
    return (
      <SwiperSlide key={item.id}>
        <div
          className="h-[440px] 2xl:w-[400px] 3xl:w-[442px] relative w-full"
          style={{ width: "100%" }}
        >
          <Link href={`/${item?.link?.link_path}`}>
            <Image
              src={item?.image[0]?.toString()}
              alt="Nimaco"
              width={2000}
              height={2000}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
        <div className="absolute bottom-[2.6rem] max-lg:-right-3 px-5 py-2 text-base right-0 bg-[#4ebdd7] text-white">
          <ProductPrice price={item?.price} inventory={item?.inventory} />
        </div>
        {item?.basic_data?.name && (
          <Link href={`/${item?.link?.link_path}`}>
            <h1 className="text-[1rem] font-semibold text-right mt-2  text-croonus-1 rows2">
              {item?.basic_data?.name}
            </h1>
          </Link>
        )}
      </SwiperSlide>
    );
  });
  return (
    <div className="col-span-2 max-lg:col-span-4">
      <div className="grid grid-cols-5 lg:gap-x-20 xl:gap-x-10">
        <div className="col-span-5 w-full max-sm:py-6 mt-16 max-md:mt-5 lg:ml-[4rem] flex max-md:place-self-center place-self-start max-lg:w-[100%] order-3 lg:order-1">
          <div className="w-full h-[190px] sm:h-[330px] lg:h-[370px] xl:h-[340px] 2xl:h-[370px] relative ">
            <Image
              src={indexBanner2[0]?.image}
              alt=""
              fill={true}
              className="w-full"
              style={{ objectFit: "cover" }}
            />
            <div className="lg:w-[290px] bg-croonus-1 bg-opacity-50 pb-2 h-full max-lg:w-[85%] absolute top-0 left-0 px-5 flex flex-col gap-2 justify-end">
              <h1 className="font-medium text-lg text-white">
                {indexBanner2[0]?.title}
              </h1>
              <p className="text-white text-xs">{indexBanner2[0]?.text}</p>
              <Link href={indexBanner2[0]?.url ?? "/"} className="mb-2">
                <button className="bg-[#4ebdd7]  flex items-center font-semibold text-white text-[0.9rem]  px-[1.2rem] py-[0.4rem]">
                  <p>Saznaj</p>
                  <i className="fa-solid pl-2 no-underline fa-chevron-right text-[0.622rem]"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-2 max-lg:place-self-center max-sm:col-span-5 max-lg:mt-[3rem] mt-[12.5rem] lg:ml-[0.1rem] order-1 lg:order-2">
          <h1 className="font-medium text-3xl max-md:text-xl lg:mt-[6.875rem] text-croonus-1">
            {action2[0]?.title}
          </h1>
          <div className="relative mt-[2rem] lg:mt-20 afterborder flex flex-col items-start">
            <Link href={`/sekcija/action`} className="text-croonus-1 text-base">
              <Translated Key="view_all_products" />
            </Link>

            <div className="flex flex-row gap-5 mt-8 divide-x divide-x-2 divide-[#4ebdd7]">
              <i
                className="fa-solid fa-arrow-left text-[#4ebdd7] text-base cursor-pointer"
                onClick={() => onSwiperLeftClick()}
              ></i>
              <i
                className="fa-solid fa-arrow-right pl-5 text-[#4ebdd7] text-base cursor-pointer"
                onClick={() => onSwiperRightClick()}
              ></i>
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-start-3 sm:col-end-6 max-sm:col-span-5  max-lg:mt-[3rem] mt-[12.5rem] order-2 lg:order-3 max-sm:w-[100%]">
          <Swiper
            slidesPerView={1}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            onSwiper={(swiper) => setSwiper(swiper)}
            spaceBetween={30}
            className="homeSwiper"
            style={{ width: "100%" }}
          >
            {items}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductItemTwo;
