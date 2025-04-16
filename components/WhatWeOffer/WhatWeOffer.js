import Layout from "../UI/Layout";
import Image from "next/image";
import classes from "./WhatWeOffer.module.css";
import Translated from "../../context/state";
import Icon1 from "../../assets/Icons/1.png";
import Icon2 from "../../assets/Icons/2.png";
import Icon3 from "../../assets/Icons/3.png";
import Icon4 from "../../assets/Icons/4.png";
import Link from "next/link";
import PDF from "../../assets/9040508_filetype_pdf_icon.png";
import Logo from "../../assets/nimaco-logo.png";
import User from "../../assets/user.png";

const WhatWeOffer = ({ indexBanner }) => {
  return (
    // <div className="bg-[#4ebdd7] max-md:py-6 py-12">
    //   <Layout>
    //     <div className="flex flex-col items-center justify-between lg:flex-row">
    //       <div className="relative flex w-full flex-col gap-3 max-lg:text-center lg:w-[95%] items-center lg:items-start">
    //         <h1
    //           className={`${classes.borderr} relative pb-2 text-2xl text-white font-bold`}
    //         >
    //           <Translated Key="title_onama" />
    //         </h1>
    //         <span className={classes.line}></span>
    //         <span className="text-base text-white lg:w-[80%] pt-5 font-light">
    //           <Translated Key="desc_onama" />
    //         </span>
    //       </div>
    //       <div className="grid w-full grid-cols-2 grid-rows-2 gap-x-1 max-lg:mt-4 lg:w-1/2">
    //         <div
    //           className={`${classes.icon} max-md:self-start col-span-1 row-start-1 row-end-2 flex flex-row items-center justify-between p-3 hover:cursor-pointer max-lg:justify-center max-lg:text-center lg:hover:bg-white text-white lg:hover:text-[#4ebdd7]`}
    //         >
    //           <div className="flex flex-col gap-2">
    //             <h1 className="text-lg font-bold ">
    //               <Translated Key="title_benefit1" />{" "}
    //             </h1>
    //             <span className="text-base">
    //               <Translated Key="benefit1" />
    //             </span>
    //           </div>
    //           <div className={`${classes.image} invisible max-lg:hidden`}>
    //             <Image src={Icon3} alt="Nimaco" width={50} height={50} />
    //           </div>
    //         </div>

    //         <div
    //           className={`${classes.icon} max-md:self-start col-span-1 row-start-1 row-end-2 flex flex-row items-center justify-between p-3 hover:cursor-pointer max-lg:justify-center max-lg:text-center lg:hover:bg-white text-white lg:hover:text-[#4ebdd7]`}
    //         >
    //           <div className="flex flex-col gap-2">
    //             <h1 className="text-lg font-bold ">
    //               <Translated Key="title_benefit2" />{" "}
    //             </h1>
    //             <span className="text-base font-light ">
    //               <Translated Key="benefit2" />
    //             </span>
    //           </div>
    //           <div className={`${classes.image} invisible max-lg:hidden`}>
    //             <Image src={Icon2} alt="Nimaco" width={50} height={50} />
    //           </div>
    //         </div>

    //         <div
    //           className={`${classes.icon} max-md:self-start col-span-1 row-start-2 row-end-3 flex flex-row items-center justify-between p-3 hover:cursor-pointer max-lg:justify-center max-lg:text-center lg:hover:bg-white text-white lg:hover:text-[#4ebdd7]`}
    //         >
    //           <div className="flex flex-col gap-2">
    //             <h1 className="text-lg font-bold ">
    //               <Translated Key="title_benefit3" />
    //             </h1>
    //             <span className="text-base">
    //               <Translated Key="benefit3" />
    //             </span>
    //           </div>
    //           <div className={`${classes.image} invisible max-lg:hidden`}>
    //             <Image src={Icon1} alt="Nimaco" width={50} height={50} />
    //           </div>
    //         </div>

    //         <div
    //           className={`${classes.icon} max-md:self-start col-span-1 row-start-2 row-end-3 flex flex-row items-center justify-between p-3 hover:cursor-pointer max-lg:justify-center max-lg:text-center lg:hover:bg-white text-white lg:hover:text-[#4ebdd7]`}
    //         >
    //           <div className="flex flex-col gap-2">
    //             <h1 className="text-lg font-bold ">
    //               <Translated Key="title_benefit4" />
    //             </h1>
    //             <span className="text-base">
    //               <Translated Key="benefit4" />
    //             </span>
    //           </div>
    //           <div className={`${classes.image} invisible max-lg:hidden`}>
    //             <Image src={Icon4} alt="Nimaco" width={50} height={50} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Layout>
    // </div>
    <div className="w-[90%] max-sm:w-[95%] mx-auto mt-[90px]">
      <div className="grid grid-cols-2 gap-[30px]">
        <div className="grid grid-cols-2 max-md:col-span-2 col-span-1">
          <div className="col-span-1 max-md:col-span-2 max-sm:h-[210px] h-[263px] relative">
            {indexBanner && (
              <Image
                src={indexBanner[0]?.image}
                width={2000}
                height={2000}
                priority
                style={{ objectFit: "cover" }}
                className="mix-blend-multiply absolute -top-[50px] left-0  "
              />
            )}
            <p className="uppercase absolute  bottom-[0rem] font-semibold right-[1.2rem]">
              {indexBanner && indexBanner[0]?.title}
            </p>
          </div>
          <div className="bg-[#f6f8f9] max-md:pb-4 px-3 max-md:col-span-2 col-span-1 flex text-center items-center justify-center w-full flex-col gap-5">
            <h1 className="font-semibold max-md:mt-[2.5rem]">
              {" "}
              {indexBanner && indexBanner[0]?.subtitle}
            </h1>
            <p>{indexBanner && indexBanner[0]?.text}</p>
            <div className="flex flex-row md:mt-[60px] items-center gap-3 justify-center bg-[#4ebdd7] cursor-pointer hover:bg-opacity-80 rounded-lg w-[195px] h-[44px]">
              <div>
                <Image src={PDF} width={20} height={20} />
              </div>
              <div className="flex flex-col items-start justify-start gap-1">
                <h1 className="text-white uppercase text-sm">
                  {indexBanner && indexBanner[0]?.button}
                </h1>
                <p className="font-light text-white text-xs">(PDF 3.5mb)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 max-md:col-span-2 grid grid-cols-3 relative">
          <div className="col-span-1 max-md:col-span-3 md:max-w-[280px] uppercase relative rounded-t-xl">
            <div className="md:absolute h-[290px] left-0 bottom-0 bg-[#044e7b] rounded-t-lg w-full flex flex-col gap-3 items-center my-auto justify-center ">
              <h1 className="text-white text-[24px] font-semibold">Postani</h1>
              <div>
                <Image src={Logo} width={210} height={46} />
              </div>
              <h1 className="text-white text-[24px] font-semibold">
                B2B Partner
              </h1>
            </div>
          </div>
          <div className="col-span-2 max-md:col-span-3 max-md:pb-4 bg-[#f6f8f9] flex items-center gap-5 justify-center  text-center flex-col">
            <h1 className="text-[18px] font-semibold max-md:mt-3 uppercase max-w-[415px]">
              Kako da postaneš b2b kupac?
            </h1>
            <h1 className=" max-w-[415px]">
              Registrujte svoj nalog na našem B2B portalu i obezbedite posebne
              komercijalne uslove.{" "}
            </h1>{" "}
            <div className="flex flex-row md:mt-[50px] items-center justify-center gap-3 bg-croonus-3 cursor-pointer hover:bg-opacity-80 rounded-lg w-[195px] h-[44px]">
              <div>
                <Image src={User} width={20} height={20} />
              </div>
              <Link href="https://b2b.nimaco.rs/" target="_blank" rel="noopener noreferrer">
                <div className="flex flex-col items-start justify-start gap-1">
                  <h1 className="text-white uppercase text-sm">Registruj se </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;
