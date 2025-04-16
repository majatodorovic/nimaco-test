"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";
import Image from "next/image";
import Brand1 from "../../assets/Brands/brand1.png";
import Brand2 from "../../assets/Brands/brand2.png";
import Brand3 from "../../assets/Brands/brand3.png";
import Brand4 from "../../assets/Brands/brand4.png";
import Brand5 from "../../assets/Brands/brand5.png";
import Brand6 from "../../assets/Brands/brand6.png";
import Brand7 from "../../assets/Brands/brand7.png";
import Brand8 from "../../assets/Brands/brand8.png";
import Brand9 from "../../assets/Brands/brand9.png";
import Brand10 from "../../assets/Brands/brand10.png";
import Brand11 from "../../assets/Brands/brand11.png";
import Brand12 from "../../assets/Brands/brand12.png";
import Brand13 from "../../assets/Brands/brand13.png";
import Brand14 from "../../assets/Brands/brand14.png";
import Brand15 from "../../assets/Brands/brand15.png";
import Brand16 from "../../assets/Brands/brand16.png";
import Brand17 from "../../assets/Brands/brand17.png";
import Brand18 from "../../assets/Brands/brand18.png";
import Brand19 from "../../assets/Brands/brand19.png";
import Brand20 from "../../assets/Brands/brand20.png";

const Brands = () => {
  const data = [
    { id: 1, image: Brand1 },
    { id: 2, image: Brand2 },
    { id: 3, image: Brand3 },
    { id: 4, image: Brand4 },
    { id: 5, image: Brand5 },
    { id: 6, image: Brand6 },
    { id: 7, image: Brand7 },
    { id: 8, image: Brand8 },
    { id: 9, image: Brand9 },
    { id: 10, image: Brand10 },
    { id: 11, image: Brand11 },
    { id: 12, image: Brand12 },
    { id: 13, image: Brand13 },
    { id: 14, image: Brand14 },
    { id: 15, image: Brand15 },
    { id: 16, image: Brand16 },
    { id: 17, image: Brand17 },
    { id: 18, image: Brand18 },
    { id: 20, image: Brand20 },
  ];

  return (
    <div className="py-[80px]">
         <h3 className="text-[24px] font-medium uppercase text-center mb-[3rem]">
      Brendovi</h3>
      <div className="flex flex-row items-center justify-center gap-[100px] max-lg:gap-0 ">
      <Swiper
          className={`!w-full keen-slider`}
          navigation={false}
          modules={[ Autoplay]}
          rewind
          slidesPerView={3}
          spaceBetween={5}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 20
            },
            
          }}
          autoplay={{
            delay: 2000, 
            disableOnInteraction: false,
          }}
        >
          {data?.map(({ id, image }) => {
            return (
              <SwiperSlide key={id}>
                <div className=" max-md:m-[0.2rem]  py-[1rem] max-md:py-[0.6rem] max-md:px-[0.1rem] px-[3rem]">
                    <Image
                      src={image}
                      alt="brand"
                      width={300}
                      height={140}
                      quality={100}
                      sizes={`100vw`}
                      className={`max-h-[100px] object-contain`}
                    />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        
      </div>
    </div>
  );
};

export default Brands;
