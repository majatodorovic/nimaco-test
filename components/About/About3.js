import Image from "next/image";
import Link from "next/link";
import nis from "../../assets/Images/ni-maco-lokacija-nis.png";
import bg from "../../assets/Images/ni-maco-beo-maco-lokacija.png";
import cacak from "../../assets/Images/ni-maco-lokacija-cacak.png";
import Translated from "../../context/state";

const About3 = () => {
  return (
    <div className="max-md:h-full w-full py-6 max-md:h-[260px] bg-[#044e7b] mt-10">
         <h3 className="text-[24px] font-medium uppercase text-center mb-[3rem] text-white mt-2">
      Kontaktirajte nas</h3>
      <div className="w-[84%] 2xl:w-[73%] max-md:py-5 max-md:gap-5 max-md:w-[95%] mx-auto h-full my-auto flex max-md:flex-col items-center justify-between gap-[30px]">
        <div className="flex items-center gap-10">
          <div className="w-[160px] h-[180px] ">
            <Image src={nis} alt="route" width={200} height={240} className="h-full object-cover shadow-xl overflow-hidden rounded-full"/>
          </div>
          <div className="flex flex-col items-start gap-3 text-white">
            <h1 className="uppercase font-medium">NI MACO d.o.o, Niš</h1>
            <p className="font-light text-sm">
            <Translated Key="address"/>:
            <Link href="https://www.google.com/maps/place/Ni+Maco+Doo/@43.3128847,21.9232485,15z/data=!4m6!3m5!1s0x4755b091c86e8215:0xbe4d0d96dad5dc6!8m2!3d43.3128847!4d21.9232485!16s%2Fg%2F11dxbdlp9m?entry=ttu" target="_blank" className="font-medium text-sm cursor-pointer hover:underline"> Bulevar Dr Zorana Đinđića 121A, 18000 Niš</Link> 
            </p>
            <p className=" font-light text-sm"><Translated Key="phone"/>: <Link href="tel:+38118512444" target="_blank" className="font-medium text-sm cursor-pointer hover:underline">+381 18 512 444</Link></p>
          </div>
        </div>
        <div className="flex items-center gap-10">
        <div className="w-[160px] h-[180px] ">
            <Image src={bg} alt="route" width={200} height={240} className="h-full object-cover shadow-xl overflow-hidden rounded-full"/>
          </div>
          <div className="flex flex-col items-start gap-3 text-white">
            <h1 className="uppercase font-medium">BEO MACO d.o.o, Beograd</h1>
            <p className="font-light text-sm">
            <Translated Key="address"/>:
            <Link href="https://www.google.com/maps/place/Beo+Maco+d.o.o./@44.8504073,20.3516031,17z/data=!3m1!4b1!4m6!3m5!1s0x475a6671d43dd6e5:0x1343807d26393dca!8m2!3d44.8504035!4d20.3541834!16s%2Fg%2F11dxrzbrbs?coh=210790&entry=tts&g_ep=EgoyMDI0MDUxNC4wKgBIAVAD" target="_blank" className="font-medium text-sm cursor-pointer hover:underline"> Stojana Dečermića 15, 11080 Beograd</Link>
            </p>
            <p className="font-light text-sm">
            <Translated Key="phone"/>: <Link href="tel:+381114122949" target="_blank" className="font-medium text-sm cursor-pointer hover:underline">+381 11 41 22 949</Link>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-10">
        <div className="w-[160px] h-[180px] ">
            <Image src={cacak} alt="route" width={200} height={240} className="h-full object-cover shadow-xl overflow-hidden rounded-full"/>
          </div>
          <div className="flex flex-col items-start gap-3 text-white">
            <h1 className="uppercase font-medium">NI MACO d.o.o, Niš, Distributivni centar Čačak</h1>
            <p className="font-light text-sm">
            <Translated Key="address"/>: <Link href="https://www.google.com/maps/place/Nimaco+doo+DC+Cacak/@43.9292004,19.8013498,10z/data=!4m7!3m6!1s0x47576dd5da8a4b9f:0xa559836326cb650b!8m2!3d43.9292004!4d20.411091!15sChBOaSBNYWNvLCDEjGHEjWFrkgEJd2FyZWhvdXNl4AEA!16s%2Fg%2F11r7xsrnsf?coh=210790&entry=tts&g_ep=EgoyMDI0MDUxNC4wKgBIAVAD" target="_blank" className="font-medium text-sm cursor-pointer hover:underline"> Preljina bb, 32212</Link>
            </p>
            <p className="font-light text-sm">
            <Translated Key="phone"/>: <Link href="tel:+38163208597" target="_blank" className="font-medium text-sm cursor-pointer hover:underline">+381 63 208 597</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About3;
