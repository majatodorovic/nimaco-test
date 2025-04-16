"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";

const ImageSliderLoop = ({ bannerimagesMobile, onBannerChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="relative ">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        className="indexslider1"
        slidesPerView={1}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => setSwiper(swiper)}
        autoplay={true}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.activeIndex);
          onBannerChange(swiper.activeIndex);
        }}
      >
        {bannerimagesMobile?.map((bannerimage, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="relative h-[300px]">
              <Image
                src={bannerimage.image}
                alt={bannerimage.text}
                className="w-full"
                fill={true}
                priority={true}
                style={{ objectFit: "cover" }}
              />
              {bannerimage?.title &&
                bannerimage?.text &&
                bannerimage?.button && (
                  <div className="absolute left-[220px] top-[80px] flex flex-col">
                    <h1 className="text-3xl max-w-[495px] font-medium text-white uppercase relative bborder">
                      {bannerimage?.title}
                    </h1>
                    <h2 className="mt-[60px] text-base font-normal text-white max-w-[495px] relative">
                      {bannerimage?.text}
                    </h2>
                    <Link href={bannerimage?.url ?? "/"}>
                      <button className="mt-[40px] border font-medium hover:bg-white hover:text-black transition-all duration-500 text-white border-white rounded-lg w-[167px] h-[60px] flex items-center justify-center">
                        {bannerimage?.button}
                      </button>
                    </Link>
                  </div>
                )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="absolute w-[90%] mx-auto -bottom-[20px] left-0 right-0 flex justify-end">
        <div className="flex items-center gap-3 justify-end">
          {bannerimages.map((bannerimage, index) => (
            <div
              key={index}
              className={`w-16 rounded-[10px] cursor-pointer h-1.5 ${
                index === currentIndex
                  ? "bg-croonus-1"
                  : "bg-[#f8f4f1] border border-croonus-1"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                onBannerChange(index);
                swiper.slideTo(index);
              }}
            ></div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ImageSliderLoop;
