"use client";

import Image from "next/image";
import Link from "next/link";
import Translated from "../../context/state";

const RecommendedCategories = ({ recommendedBanners }) => {
  
  return (
    <div className="mt-[140px] max-sm:mt-[50px] w-[95%] mx-auto md:w-[85%] 2xl:w-[75%]">
    <h3 className="text-[24px] font-medium uppercase text-center mb-[3rem]">
      Naša ponuda</h3>
    <div className=" max-md:gap-y-10 grid grid-cols-3 gap-x-[110px]">
      
      {recommendedBanners?.map((banner) => {
        return (
          <Link
            href={`${banner?.url}` ?? `/`}
            key={banner?.id}
            className="col-span-1 max-md:col-span-3 hover:scale-105 transition-all duration-500 h-[175px] relative"
          >
            <div className="flex flex-col bottombg relative items-start h-full justify-end">
              <div className="w-[177px] h-[140px]">
                <Image
                  src={banner?.image}
                  alt={banner?.title}
                  width={100}
                  height={100}
                  className="relative float-left object-contain h-full w-full z-20 pl-2 pb-3"
                />
              </div>
            </div>
            <h1 className="bborder1 max-sm:text-base text-[18px] max-w-[240px] absolute top-0 right-0 uppercase font-semibold text-right text-base">
              {banner?.title}
            </h1>
          </Link>
        );
      })}

    </div>
    </div>
  );
};

export default RecommendedCategories;
