import Image from "next/image";
import Link from "next/link";
import Image404 from "../assets/Icons/404.png";


const errorPage = () => {
  return (

    <div className="mx-auto grid w-[75%] grid-cols-1 place-items-center max-lg:w-full max-lg:text-center mt-4">
      <div className="relative z-[49] col-span-1 rounded-lg">
        <Image src={Image404} width={300} height={300} alt="Nimaco"/>
      </div>
      <div className="relative -top-16 flex h-full text-white w-full flex-col items-center justify-center rounded-lg  bg-croonus-3 py-24">
        <p className="font-medium">
          Izvinite, stranica koju tražite nije pronađena. Molimo Vas proverite
          da li ste uneli ispravan URL.
        </p>
        <Link href="/">
          {" "}
          <button className="mt-5 rounded-lg bg-croonus-4 px-5 py-2 font-semibold text-white hover:bg-opacity-80">
            Idi na početnu stranu
          </button>
        </Link>
      </div>
    </div>
  );
};

export default errorPage;
