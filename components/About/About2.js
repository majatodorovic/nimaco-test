import Image from "next/image";

const About2 = ({ indexBanner3 }) => {
  return (
    <div className="w-[90.4375%] mx-auto mt-[30px] lg:mt-[80px]">
      <div className="grid grid-cols-3 ">
        <div className="col-span-1 max-md:-bottom-4 max-md:col-span-3 md:pl-[30px] md:pr-[20px] max-md:items-center max-md:p-5 max-md:text-center relative md:-right-[0.65rem] z-10 bg-[#438ec0] rounded-xl flex flex-col items-start justify-center text-white">
          <h1 className="uppercase text-lg relative font-medium bborder1">
            Naša ponuda
          </h1>
          <p className="mt-[20px] 2xl:max-w-[430px]">
            U našoj bogatoj ponudi možete pronaći proizvode za drvenu stolariju,
            drvo-aluminijum stolariju (drvo-Al), Aluminijumsku stolariju (Alu),
            aluminijum-drvo stolariju i PVC stolariju.
          </p>
          <ul className="mt-5 2xl:max-w-[430px] list-disc pl-[2rem]">
            <li className="list-item">Okovi za drvenu stolariju</li>
            <li className="list-item">Okovi za drvo-aluminijum stolariju</li>
            <li className="list-item">Okovi za aluminijumsku stolariju</li>
            <li className="list-item">Okovi za aluminijum-drvo stolariju</li>
          </ul>
        </div>
        <div className="col-span-1 max-md:col-span-3 h-[300px] 2xl:h-[450px] 3xl:h-[560px] relative">
          <Image
            src={indexBanner3[0]?.image}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="col-span-1 max-md:-top-4 max-md:items-center max-md:p-5 max-md:text-center max-md:col-span-3 md:pl-[30px] md:pr-[20px]  relative md:-left-[0.65rem] z-10 bg-[#d0d3c3] rounded-xl flex flex-col items-start justify-center text-black">
          <h1 className="uppercase text-lg relative font-medium bborder1">
            Podrška{" "}
          </h1>
          <p className="mt-[20px] 2xl:max-w-[430px]">
            Obezbeđujemo kontinuirano snabdevanje, tehničku podršku, kao i svaku
            drugu pomoć prilikom ugradnje okova za stolariju, kao i davanje
            ponuda proizvođačima stolarije. U našoj bogatoj ponudi možete
            pronaći proizvode za drvenu stolariju, drvo aluminijum stolariju
            (drvo-Al), Aluminijumsku stolariju (Alu), aluminijum drvo stolariju
            i PVC stolariju.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About2;
