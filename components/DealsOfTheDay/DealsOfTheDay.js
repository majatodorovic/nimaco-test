"use client";
import DealsItem from "./DealsItem";
import Layout from "../UI/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import { Suspense } from "react";
import { ThumbSuspense } from "@/_components/thumb/thumb-suspense";

const DealsOfTheDay = ({ products, action4 }) => {
  return (
    <div className="py-[3rem] bg-[#f9f9f9] mt-[3rem]">
      <Layout>
        <p
          className={` md:relative max-md:text-xl text-[26px] text-center uppercase mx-auto mt-[2rem] md:mt-[4rem]`}
        >
          {action4[0]?.title}
        </p>
        {products?.length > 0 && action4?.length > 0 && (
          <Swiper
            spaceBetween={20}
            className={`!py-16 max-sm:!pt-[2rem] max-sm:!pb-[4rem] max-lg:!py-20 max-md:!mt-[2rem] !w-full`}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 5,
              },
            }}
          >
            {products?.map(({ id }) => {
              return (
                <SwiperSlide>
                  <Suspense
                    fallback={
                      <SwiperSlide
                        className={`aspect-2/3 w-full h-full bg-slate-300 animate-pulse`}
                      />
                    }
                  >
                    <ThumbSuspense
                      id={id}
                      refetchWishlist={() => {}}
                      categoryId={"*"}
                    />
                  </Suspense>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </Layout>
    </div>
  );
};

export default DealsOfTheDay;
