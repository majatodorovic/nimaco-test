"use client";
import { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { ThumbSuspense } from "@/_components/thumb/thumb-suspense";
import { useQuery } from "@tanstack/react-query";
import { list } from "@/app/api/api";

const CrosssellProducts = ({ id }) => {
  console.log("Product ID:", id); // Koristi id koji je prosleđen kao prop

  const { data: cross_sell_products = [], isLoading } = useQuery({
    queryKey: ["cross-sell-products", id],
    queryFn: async () => {
      return await list(`/product-details/cross-sell/${id}`).then(
        (response) => response?.payload?.items
      );
    },
  });

  if (cross_sell_products?.length === 0 && !isLoading) return null;

  if (isLoading)
    return (
      <div className={`mt-5 h-[10rem] w-full animate-pulse bg-slate-200`} />
    );

  if (!isLoading && cross_sell_products?.length > 0) {
    return (
      <div className="mb-6 mt-[3rem] overflow-visible max-md:col-span-4 max-sm:mx-auto max-sm:mt-[1.5rem] max-sm:w-[95%] md:mx-[0.2rem]">
        <div className="flex w-full items-center justify-between">
          <h5 className="text-[1.5rem] font-bold max-md:text-[1.1rem] ml-[4rem]">
            Možda će Vam biti potrebno
          </h5>
        </div>
        <div className="mt-[2.5rem] max-sm:mt-[1rem]">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            fadeEffect={{ crossFade: true }}
            loop={true}
            className="mySwiper3 w-[90vw] select-none"
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1680: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
          >
            {(cross_sell_products ?? [])?.map(({ id }) => {
              return (
                <Suspense
                  key={`suspense-${id}`}
                  fallback={
                    <SwiperSlide
                      className={`aspect-2/3 !h-full w-full animate-pulse bg-slate-200`}
                    />
                  }
                >
                  <SwiperSlide key={`slide-${id}`} className={`!h-auto`}>
                    <ThumbSuspense
                      id={id}
                      key={`thumb-${id}`}
                      categoryId={"*"}
                      refetchWishlist={() => {}}
                    />
                  </SwiperSlide>
                </Suspense>
              );
            })}
          </Swiper>
        </div>
      </div>
    );
  }
};

export default CrosssellProducts;
