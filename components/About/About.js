"use client";
import Image from "next/image";
import Image1 from "../../assets/Icons/img1.png";
import Image2 from "../../assets/Icons/img2.png";
import Image3 from "../../assets/Icons/img3.png";
import Image4 from "../../assets/Icons/img4.png";
import Image5 from "../../assets/Icons/img5.png";
import { useState } from "react";
const About = ({ indexBanner2 }) => {
  const [hovered, setHovered] = useState({ id: null });
  const data = [
    {
      id: 1,
      image: Image1,
      text: "VIŠE 20 GODINA ISKUSTVA",
      subtext:
        "Sa preko 20 godina iskustva u oblasti građevinske stolarije i repromaterijala, kompanija NI MACO iz Niša postala je prepoznatljivo ime u industriji. Osnovana 2002. godine, naša posvećenost kvalitetu odražava se kroz pažljivo odabrane proizvode renomiranih svetskih proizvođača, kao što su MACO, Fapim, ISO Chemie, Weiss Chemie i mnogi drugi.",
    },
    {
      id: 2,
      image: Image2,
      text: "RENOMIRANI SVETSKI PROIZVOĐAČI",
      subtext:
        "Kao pouzdan distributer, ponosni smo na saradnju s nekim od najpoznatijih svetskih proizvođača u industriji građevinske stolarije i repromaterijala. Naša dugogodišnja partnerstva s kompanijama poput MACO, Fapim, ISO Chemie, Weiss Chemie i drugima omogućila su nam da osiguramo visokokvalitetne proizvode koji zadovoljavaju najviše standarde industrije. Sa našim renomiranim svetskim proizvođačima, garantujemo kvalitet, pouzdanost i dugotrajnost naših proizvoda, pružajući vam samo najbolje opcije za vaše projekte.",
    },

    {
      id: 4,
      image: Image4,
      text: "PREKO 5.000 DOSTUPNIH PROIZVODA",
      subtext:
        "Ponosni smo na naš širok asortiman proizvoda, koji uključuje visokokvalitetne okove za drvenu, drvo-aluminijumsku (Drvo-Al), aluminijumsku (Alu), aluminijum-drvo (Al-Drvo) i PVC stolariju. Naša ponuda zadovoljava širok spektar potreba naših klijenata, pružajući im raznovrsne mogućnosti za njihove projekte.",
    },
    {
      id: 5,
      image: Image5,
      text: "KOMPLETNA PODRŠKA I EDUKACIJA",
      subtext:
        "Uz naše proizvode, pružamo i kontinuiranu podršku svim našim klijentima. Tim stručnjaka je tu da odgovori na sva vaša pitanja, pruži savete i podršku tokom celog procesa, od odabira pravih proizvoda do instalacije i održavanja. Vaše zadovoljstvo je naš prioritet, i stojimo vam na raspolaganju kako bismo vam osigurali najbolje iskustvo u radu s nama.",
    },
  ];
  return (
    <div className="w-[95%] md:w-[90%] mx-auto">
         <h3 className="text-[24px] font-medium uppercase text-center mb-[3rem]">
      Zašto Nimaco?</h3>
      <div className="grid grid-cols-2 gap-x-[90px] place-items-center">
        <div className="col-span-2 md:col-span-1 relative h-[400px] w-full 2xl:h-[600px] 2xl:w-[600px] 3xl:h-[680px] 3xl:w-[760px]">
          <Image src={indexBanner2[0]?.image} fill className="rounded-lg max-md:w-full" />
        </div>
        <div className="col-span-2 w-full md:col-span-1">
          <div className="grid grid-cols-6">
            {data.map((item, index) => {
              const isHovered = hovered.id === item.id;
              return (
                <div
                  key={index}
                  className="col-span-6 bg-[#f6f8f9] md:col-span-6 flex flex-row items-center gap-[20px] my-[10px]"
                >
                  <div className="w-[180px] bg-croonus-3 h-[130px] flex items-center justify-center rounded-lg">
                    <Image src={item.image} width={80} height={80} />
                  </div>
                  <div
                    className={` w-full h-full pr-2 py-[4px] flex items-center justify-start overflow-y-auto transition-all duration-500 ease-in max-h-[8rem]`}
                    onMouseEnter={() => setHovered({ id: item?.id })}
                    onMouseLeave={() => setHovered({ id: null })}
                  >
                    {isHovered ? (
                      <h1 className="text-[13px] font-normal text-[#1E1E1E]">
                        {item.subtext}
                      </h1>
                    ) : (
                      <h1 className="text-[18px] font-semibold text-[#1E1E1E]">
                        {item.text}
                      </h1>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
