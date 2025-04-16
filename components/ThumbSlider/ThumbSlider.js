"use client";
import React, { useState, useEffect, useRef } from "react";
import { Autoplay, FreeMode, Pagination, Thumbs, Navigation } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/navigation";
import classes from "./styles.module.css";

const ProductGallery = ({ gallery }) => {
  const [navigationEnabled, setNavigationEnabled] = useState(true);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modal, setModal] = useState(false);
  const swiperRef = useRef(null);
  const swiperModalRef = useRef(null);

  useEffect(() => {
    if (gallery?.length >= 4) {
      setNavigationEnabled(true);
    } else {
      setNavigationEnabled(false);
    }
  }, [gallery?.length, navigationEnabled]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        if (modal && swiperModalRef.current) {
          swiperModalRef.current.swiper.slidePrev();
        } else if (swiperRef.current) {
          swiperRef.current.swiper.slidePrev();
        }
      } else if (event.key === "ArrowRight") {
        if (modal && swiperModalRef.current) {
          swiperModalRef.current.swiper.slideNext();
        } else if (swiperRef.current) {
          swiperRef.current.swiper.slideNext();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal]);

  const productImage = gallery?.map((image, index) => (
    <SwiperSlide key={index} onClick={() => setModal(true)}>
      <Image src={image?.image} width={2000} height={2000} alt="Nimaco" />
    </SwiperSlide>
  ));

  const thumbImage = gallery?.map((image, index) => (
    <SwiperSlide key={index}>
      <Image
        src={image?.image}
        width={2000}
        height={2000}
        alt="Nimaco"
        className="cursor-pointer max-md:hidden"
      />
    </SwiperSlide>
  ));

  return (
    <div className="col-span-2 max-md:col-span-4  md:flex md:flex-row-reverse gap-5 md:max-h-[380px] lg:max-h-[550px] xl:max-h-[680px] 2xl:max-h-[720px] 3xl:max-h-[700px]">
      <Swiper
        ref={swiperRef}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={true}
        navigation={true}
        modules={[FreeMode, Thumbs, Pagination, Navigation]}
        className={`${classes.mySwiper2} mySwiper2 select-none`}
        breakpoints={{
          320: {
            direction: "horizontal",
            slidesPerView: 1,
            pagination: {
              clickable: true,
              enabled: true,
            },
            navigation: {
              enabled: false,
            },
          },
          768: {
            direction: "horizontal",
            slidesPerView: 1,
            pagination: {
              enabled: false,
            },
            navigation: {
              enabled: navigationEnabled,
            },
          },
        }}
      >
        {productImage}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={0}
        modules={[Navigation]}
        autoplay={true}
        navigation={navigationEnabled}
        breakpoints={{
          320: {
            enabled: false,
            navigation: {
              enabled: false,
            },
          },
          768: {
            direction: "vertical",
            slidesPerView: 4.3,
            enabled: true,
            modules: [FreeMode, Thumbs, Navigation],
            navigation: {
              enabled: gallery?.length > 4.3 ? true : false,
            },
          },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        className={`${classes.mySwiper} mySwiper max-md:hidden select-none`}
      >
        {thumbImage}
      </Swiper>
      {modal && (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[1000]"></div>
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[1000]">
            <div className="h-full py-5 flex items-center justify-center relative mt-auto">
              <Swiper
                ref={swiperModalRef}
                spaceBetween={10}
                slidesPerView={1}
                modules={[Navigation]}
                navigation={true}
                className="mySwiper3 relative select-none"
              >
                {productImage}
                <i
                  className="absolute z-[10000] top-2 right-2 fa-solid fa-times text-xl cursor-pointer hover:text-red-500"
                  onClick={() => setModal(false)}
                ></i>
              </Swiper>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGallery;
