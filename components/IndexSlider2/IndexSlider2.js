"use client";
import Image from "next/image";
import classes from "./IndexSlider2.module.css";

import check from "../../assets/Icons/checkred.png";

const IndexSlider2 = ({ indexBanner }) => {
  return (
    <>
      {indexBanner?.length > 0 && (
        <div className=" w-full bg-[#f8f4f0]">
          <div className="flex flex-col">
            <div className="relative lg:block lg:w-[78%] w-[96%] mx-auto">
              <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 grid-flow-col gap-1 max-md:mt-2 mt-10">
                <div className="imgHonney col-span-2 h-[540px] relative max-md:w-full max-md:h-[300px]">
                  {indexBanner?.map((item) => (
                    <Image
                      key={item?.id}
                      src={item?.image}
                      alt="Nimaco"
                      fill={true}
                      style={{ objectFit: "cover" }}
                      className="flex mx-auto max-md:h-full h-full object-cover max-md:object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IndexSlider2;
