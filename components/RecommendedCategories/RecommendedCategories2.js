"use client";
import Image from "next/image";
import Link from "next/link";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/swiper-bundle.css";

const RecommendedCategories2 = ({ recommendedCategories }) => {
  if (!recommendedCategories || recommendedCategories.length === 0) {
    return null;
  }

  const items = recommendedCategories?.map((category) => {
    return (
      <div
        key={category?.id}
        className="col-span-1 max-md:hidden h-full w-full mt-3"
      >
        <div className="flex flex-col items-start justify-center h-full w-full">
          <Link href={`/${category?.link?.link_path}`}>
            <h1 className="uppercase text-[18px] font-medium clamp-1 min-h-[3.4rem]">
              {category?.basic_data?.name}
            </h1>
          </Link>
          <div className="h-full w-full relative aspect-square overflow-hidden ">
            <Link href={`/${category?.link?.link_path}`}>
              {category?.images?.image ? (
                <Image
                  src={category?.images?.image}
                  fill
                  alt="category image"
                  style={{ objectFit: "cover" }}
                  className="hover:scale-[1.15] bg-fixed  transition-all duration-500"
                />
              ) : null}
            </Link>
          </div>
        </div>
      </div>
    );
  });
  const items2 = recommendedCategories?.map((category) => {
    return (
      <SwiperSlide
        key={category?.id}
        className="col-span-1 md:hidden h-full w-full mt-3"
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="h-full w-full relative aspect-square overflow-hidden ">
            <Link href={`/${category?.link?.link_path}`}>
              {category?.images?.image ? (
                <Image
                  src={category?.images?.image}
                  fill
                  alt="category image"
                  style={{ objectFit: "cover" }}
                  className="hover:scale-[1.15] bg-fixed  transition-all duration-500"
                />
              ) : null}
              <div className="uppercase bg-black bg-opacity-30 absolute h-full w-full flex items-center justify-center text-white text-center my-auto text-[18px] font-medium clamp-1 min-h-[3.4rem]">
                {category?.basic_data?.name}
              </div>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    );
  });
  return (
    <div className="grid md:mx-[150px] xl:mx-[140px] 2xl:mx-[267px] mt-[40px] grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-6 overflow-hidden py-[4rem]">
      <div className="uppercase relative flex items-center justify-center text-[18px]   col-span-1 md:col-span-2 xl:col-span-3">
        <p className="relative text-[26px]"> Najtraženije kategorije</p>{" "}
      </div>
      {items}
      <Swiper
        className="recommendedSlider col-span-1 md:hidden"
        slidesPerView={1.3}
        spaceBetween={10}
        loop={true}
        autoplay={true}
      >
        {items2}
      </Swiper>
      {/* <div className="uppercase relative flex items-center justify-center text-[18px]   col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3">
        <button className="bg-[#044f7b] hover:bg-opacity-80 text-white uppercase text-[17px] font-medium py-2 px-4 rounded-lg">
          Kompletna ponuda
        </button>
      </div> */}
    </div>
  );
};

export default RecommendedCategories2;
