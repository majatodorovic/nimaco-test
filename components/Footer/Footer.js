"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { post } from "@/app/api/api";
import Link from "next/link";
import Image from "next/image";
import Image1 from "../../assets/Images/american.png";
import Image2 from "../../assets/Images/visa.png";
import Image3 from "../../assets/Images/bancaIntesa.png";
import Image4 from "../../assets/Images/master.png";
import Image5 from "../../assets/Images/img.png";
import Image6 from "../../assets/Images/img1.png";
import Image7 from "../../assets/Images/img3.png";
import Image8 from "../../assets/Images/img4.png";
import Logo from "../../assets/Images/logo.png";
import "react-toastify/dist/ReactToastify.css";
import Translated from "../../context/state";
import { useRouter, usePathname } from "next/navigation";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(true);
  const [info, setInfo] = useState(false);
  const [company, setCompany] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
 
  return (
    <>
      <div className="mt-16  pt-[5rem] pb-[3rem] max-md:pb-2 max-lg:mt-10 bg-[#044e7b] text-white">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center lg:hidden">
          <Image src={Logo} alt="logo" width={200} height={200} />
          
          {/* <div className="mx-auto mt-10 flex w-[85%] flex-col gap-5">
            <h1 className="text-center text-xl font-semibold uppercase">
              Newsletter
            </h1>
            <form
              className="flex w-full flex-col items-start justify-start gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="email"
                name="email"
                placeholder="Unesite e-mail"
                {...register("email", {
                  required: true,
                  validate: {
                    validEmail: (value) => {
                      const currentEmails = value
                        .split(",")
                        .filter((e) => e && e.trim());
                      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
                      for (let i = 0; i < currentEmails.length; i++) {
                        if (!regex.test(currentEmails[i].replace(/\s/g, ""))) {
                          return false;
                        }
                      }
                    },
                    emailLength: (value) => {
                      const currentEmails = value
                        .split(",")
                        .filter((e) => e && e.trim());
                      if (currentEmails.length > 10) {
                        return false;
                      }
                    },
                  },
                })}
                className={
                  errors.email
                    ? `h-10 w-full rounded-md placeholder:text-xs focus:border-red-500 focus:ring-0 max-lg:w-full max-lg:text-center`
                    : `h-10 w-full rounded-md   border-[#d1d1d1] placeholder:text-xs focus:border-croonus-4 focus:ring-0 max-lg:w-full max-lg:text-center`
                }
              />
              <div className="flex w-full flex-row items-center justify-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="h-6 w-6 rounded border-[#d1d1d1]"
                  onClick={() => {
                    setTerms(!terms);
                  }}
                />
                <label htmlFor="terms" className="text-base">
                  Saglasan/na sam sa svim uslovima
                </label>
              </div>
              <button
                onClick={handleSubmit(onSubmit)}
                className="w-1/3 self-center rounded-md bg-[#044e7b] px-5 py-1.5 text-sm text-white hover:bg-opacity-80"
              >
                Prijavi se
              </button>
            </form>
          </div> */}
    
        </div>
        <div className="mx-auto grid w-[90%] grid-cols-5 gap-x-5 3xl:gap-x-10 max-lg:mt-10 max-lg:w-full max-lg:gap-y-6 pb-[2rem] pb-[3rem] 3xl:pb-[5rem]">
          <div className="flex h-full flex-col items-center text-center text-sm max-lg:col-span-5 md:text-start md:items-start md:pl-[2rem] max-md:hidden">
            <Image 
            src={Logo}
            width={200}
            height={200}
            alt="Nimaco"
            className=""/>
              <p className="mt-4">{process.env.ADDRESS},</p>
              <p>18000 Niš</p>
              <p>MB: {process.env.MB}</p>
              <p>PIB: {process.env.PIB}</p>
          </div>
        <div className="flex h-full flex-col items-center text-center text-sm max-lg:col-span-5 md:items-start ">
            <div
              onClick={() => setInfo(!info)}
              className={
                info
                  ? `mt-3 flex w-full flex-row items-center justify-center gap-3 bg-[#044e7b] text-center text-white lg:hidden`
                  : `flex flex-row items-center gap-3 lg:hidden`
              }
            >
              <p className="text-md font-semibold uppercase"> <Translated Key="user_account" /></p>
              <i className="fa-solid fa-chevron-down lg:hidden"></i>
            </div>
            <p className="text-md font-semibold uppercase max-lg:hidden">
            <Translated Key="user_account" />
            </p>
            <div className="mt-5 flex flex-col gap-2 max-lg:hidden md:items-start md:text-start">
              <a href="/nalog" className="hover:underline"><Translated Key="login" /></a>
              <a href="forgotten-password" className="hover:underline"><Translated Key="forgottenpassword" /></a>
              <a href="/nalog" className="hover:underline"><Translated Key="registration" /></a>
            </div>
            <div className={info ? `mt-5 flex flex-col gap-2 ` : `hidden`}>
            <a href="/nalog" className="hover:underline"><Translated Key="login" /></a>
            <a href="forgotten-password"><Translated Key="forgottenpassword" className="hover:underline"/></a>
              <a href="/nalog" className="hover:underline"><Translated Key="registration" /></a>
            </div>
          </div>
          <div className="flex h-full flex-col items-center  self-stretch overflow-hidden text-center text-sm max-lg:col-span-5 md:text-start md:items-start">
            <div
              onClick={() => setBuying(!buying)}
              className={
                buying
                  ? `flex w-full flex-row items-center justify-center gap-3 bg-[#044e7b] text-center text-white lg:hidden`
                  : `flex flex-row items-center gap-3 lg:hidden`
              }
            >
              <h1 className="text-md font-semibold uppercase"><Translated Key="shopping"/></h1>
              <i className="fa-solid fa-chevron-down lg:hidden"></i>
            </div>
            <h1 className="text-md font-semibold uppercase max-lg:hidden">
            <Translated Key="ordering_delivery"/>
            </h1>

            <div className="mt-5 flex flex-col gap-2 max-lg:hidden">
              <Link href="/informacije-o-kupovini" className={`cursor-pointer hover:underline ${pathname?.includes("/informacije-o-kupovini")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="shopping_info"/></Link>
              <Link href="/politika-privatnosti" className={`cursor-pointer hover:underline ${pathname?.includes("/politika-privatnosti")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="privacy_policy"/></Link>
              <Link href="/uslovi-koriscenja" className={`cursor-pointer hover:underline ${pathname?.includes("/uslovi-koriscenja")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="terms_conditions"/></Link>
              <Link href="/cesta-pitanja" className={`cursor-pointer hover:underline ${pathname?.includes("/cesta-pitanja")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="q&a"/></Link>
                  <Link href="/kako-kupiti" className={`cursor-pointer hover:underline ${pathname?.includes("/kako-kupiti")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="howtobuy"/></Link>
            </div>
            <div
              className={
                buying
                  ? `mt-5 flex translate-x-0 flex-col gap-2 transition-all duration-300 lg:hidden `
                  : `hidden`
              }
            >
             <Link href="/informacije-o-kupovini" className="cursor-pointer hover:underline"><Translated Key="shopping_info"/></Link>
              <Link href="/politika-privatnosti" className="cursor-pointer hover:underline"><Translated Key="privacy_policy"/></Link>
              <Link href="/uslovi-koriscenja" className="cursor-pointer hover:underline"><Translated Key="terms_conditions"/></Link>
              <Link href="/cesta-pitanja" className="cursor-pointer hover:underline"><Translated Key="q&a"/></Link>
              <Link href="/kako-kupiti" className="cursor-pointer hover:underline"><Translated Key="howtobuy"/></Link>
            </div>
          </div>
         
          <div className="flex h-full flex-col items-center text-center text-sm max-lg:col-span-5 md:items-start md:text-start">
            <div
              onClick={() => setCompany(!company)}
              className={
                company
                  ? `mt-3 flex w-full flex-row items-center justify-center gap-3 bg-[#044e7b] text-center text-white lg:hidden`
                  : `flex flex-row items-center gap-3 lg:hidden`
              }
            >
              <h1 className="text-md font-semibold uppercase"><Translated Key="company"/></h1>
              <i className="fa-solid fa-chevron-down lg:hidden"></i>
            </div>
            <h1 className="text-md font-semibold uppercase max-lg:hidden">
            <Translated Key="company"/>
            </h1>
            <div className="mt-5 flex flex-col gap-2 max-lg:hidden">
            <Link href="katalozi" className={`cursor-pointer hover:underline ${pathname?.includes("/katalozi")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="catalogs"/></Link>
              <Link href="o-nama" className={`cursor-pointer hover:underline ${pathname?.includes("/o-nama")
              ? "underline text-croonus-3" : ""
              } `}><Translated Key="about_us"/></Link>
              <Link href="/kontakt" className={`cursor-pointer hover:underline ${pathname?.includes("/kontakt")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="contact"/></Link>
              <Link href="/karijera" className={`cursor-pointer hover:underline ${pathname?.includes("/karijera")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="career"/></Link>
              <Link href="/blog" className={`cursor-pointer hover:underline ${pathname?.includes("/blog")
              ? "underline text-croonus-3" : ""
              }`}><Translated Key="blog"/></Link>
            
            </div>
            <div
              className={
                company ? `mt-5 flex flex-col gap-2 lg:hidden` : `hidden`
              }
            >
              <Link href="/katalozi" className="hover:underline"><Translated Key="catalogs"/></Link>
              <Link href="/o-nama" className="hover:underline"><Translated Key="about_us"/></Link>
              <Link href="/kontakt" className="hover:underline"><Translated Key="contact"/></Link>
              <Link href="/" className="hover:underline"><Translated Key="stores"/></Link>
              <p className="font-semibold">{process.env.COMPANY}</p>
              <p>{process.env.STREET},</p>
              <p>{process.env.TOWN}</p>
              <p>MB: {process.env.MB}</p>
              <p>PIB: {process.env.PIB}</p>
              
            </div>
          </div>
        
       <div className="flex h-full flex-col items-center text-center text-sm max-lg:col-span-5 md:text-start md:items-start">
      
          
              <div className="mx-auto max-lg:hidden">
          <p className="mt-2 text-[11px]">
            Cene na sajtu su iskazane u dinarima sa uračunatim porezom, a
            plaćanje se vrši isključivo u dinarima. Isporuka se vrši SAMO na
            teritoriji Republike Srbije.
          </p>
          <p className="mt-2 text-[11px]">
            Nastojimo da budemo što precizniji u opisu proizvoda, prikazu slika
            i samih cena, ali ne možemo garantovati da su sve informacije
            komplente i bez grešaka. Svi artikli prikazani na sajtu su deo naše
            ponude i ne podrazumeva se da su dostupni u svakom trenutku.
          </p>{" "}
          <br />
        </div>
          </div>
        </div>
       
        <div className="border-t border-white pt-[3rem] md:pt-[6rem] w-[80%] mx-auto text-center">
         <p className="mt-4 text-md font-semibold uppercase">
             
              </p>
              <div className="mt-4 flex items-center gap-5 justify-center">
              <Link
              href="https://www.facebook.com/officenimaco"
              target="_blank"
              rel="noopener noreferrer"
              >
                <i className="fa-brands fa-facebook-f cursor-pointer border border-white  px-6 py-4 text-xl text-black transition-all duration-[400ms] hover:scale-105 hover:shadow-lg hover:bg-[#044e7b] rounded-full text-white"></i>
              </Link>
              <Link  
                href="https://www.instagram.com/office_nimaco"
                target="_blank"
                rel="noopener noreferrer">
                <i className="fa-brands fa-instagram cursor-pointer  border border-white px-6 py-4 text-xl font-bold text-black transition-all duration-[400ms] hover:shadow-lg hover:scale-105 hover:bg-[#044e7b] text-white rounded-full"></i>
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/office-nimaco/"
                  target="_blank"
                  rel="noopener noreferrer">
                <i className="fa fa-brands fa-linkedin cursor-pointer border border-white  px-6 py-4 text-xl text-black transition-all duration-[400ms] hover:scale-105 hover:shadow-lg hover:bg-[#044e7b] rounded-full text-white"></i>
                  </Link>
        
              </div>
              <div className="flex items-center justify-center max-lg:hidden max-lg:flex-col mt-5">
          <h1 className="text-sm font-light">
            2024 &copy; {process.env.COMPANY} | All rights reserved. Powered by
          </h1>
          <br />
          <a
            href="https://www.croonus.com"
            target={"_blank"}
            className="text-sm font-semibold "
          >
            &nbsp;Croonus Technologies
          </a>
        </div>
         </div>
         <div className="lg:hidden text-center mt-6">
          <p className="text-base">
            2024 &copy; {process.env.COMPANY} | All rights reserved.
          </p>
          <div className="flex items-center justify-center">
            <h1 className="text-base">Powered by</h1>{" "}
            <a
              href="https://www.croonus.com"
              target={"_blank"}
              className="text-base font-semibold text-croonus-3 "
            >
              &nbsp;Croonus Technologies
            </a>
          </div>
        </div>
        <div className="mx-auto w-[95%] text-justify lg:hidden mt-[4rem]">
        <p className="mt-2 text-[10px]">
        <Translated Key="policy_text"/>
        </p>
        <p className="mt-2 text-[10px]">
        <Translated Key="policy_text2"/>
        
        </p>
      </div>
      </div>
     
      
      {/* <div className="mx-auto mt-5 flex flex-row justify-center gap-5 border-b-2 border-b-black py-3 max-lg:gap-4 lg:w-[60%]">
        <Image
          src={Image5}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image4}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image8}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image7}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image3}
          className="w-[25%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image1}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image6}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
        <Image
          src={Image2}
          className="w-[5%] object-contain max-lg:w-[5%]"
          alt=""
        />
      </div> */}

      
        
        
      
    </>
  );
};

export default Footer;
