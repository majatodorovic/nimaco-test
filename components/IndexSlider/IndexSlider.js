"use client";
import { useState } from "react";
import ImageSliderLoop from "../ImageSliderLoop/ImageSliderLoop";
import ImageSliderLoopMobile from "../ImageSliderLoopMobile/ImageSliderLoopMobile";
import "/styles/globals.css";

const IndexSlider = ({ banner, mobileBanner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className={`mx-auto 4xl:container relative `}>
      <div className="mx-auto w-full ">
        <div className="flex flex-col mng ">
          <div className="hidden lg:block  ">
            {banner?.length > 0 && (
              <ImageSliderLoop
                bannerimages={banner}
                onBannerChange={setCurrentIndex}
              />
            )}
          </div>
          <div className="block lg:hidden">
            {" "}
            {mobileBanner?.length > 0 && (
              <ImageSliderLoopMobile
                bannerimagesMobile={mobileBanner}
                onBannerChange={setCurrentIndex}
              />
            )}
          </div>
          {/* <div className="bg-[#f8f4f1]">
            <div className="max-sm:pb-6 pb-12 max-lg:mx-auto max-lg:w-full max-lg:text-center w-[90%] mx-auto flex items-center justify-between">
              <p className="max-lg:text-[1.1rem] text-xl uppercase font-extrabold text-croonus-1 lg:w-[55%] max-lg:w-[99%] max-lg:mx-auto relative z-100">
                {banner[currentIndex]?.text}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default IndexSlider;
