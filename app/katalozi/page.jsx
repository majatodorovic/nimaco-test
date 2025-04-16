

import Image from "next/image";
import Link from "next/link";
import Translated from "../../context/state";

import Brand1 from "../../assets/Brands/brand1.png";
import Brand2 from "../../assets/Brands/brand2.png";
import Brand3 from "../../assets/Brands/brand3.png";
import Brand4 from "../../assets/Brands/brand4.png";
import Brand5 from "../../assets/Brands/brand5.png";
import Brand6 from "../../assets/Brands/brand6.png";
import Brand7 from "../../assets/Brands/brand7.png";
import Brand8 from "../../assets/Brands/brand8.png";
import Brand9 from "../../assets/Brands/brand9.png";
import Brand10 from "../../assets/Brands/brand10.png";
import Brand11 from "../../assets/Brands/brand11.png";
import Brand12 from "../../assets/Brands/brand12.png";
import Brand13 from "../../assets/Brands/brand13.png";
import Brand14 from "../../assets/Brands/brand14.png";
import Brand15 from "../../assets/Brands/brand15.png";
import Brand16 from "../../assets/Brands/brand16.png";
import Brand17 from "../../assets/Brands/brand17.png";
import Brand18 from "../../assets/Brands/brand18.png";
import Brand19 from "../../assets/Brands/brand19.png";
import Brand20 from "../../assets/Brands/brand20.png";
export const metadata = {
    title: "Katalozi | Nimaco",
    description: "Dobrodošli na online prodavnicu Nimaco.",
};
const Catalogs = () => {

    const data = [
        { id: 1, image: Brand1, link: "/" },
        { id: 2, image: Brand2, link: "https://www.fimet-handles.com/en/download/" },
        { id: 3, image: Brand3, link: "https://www.iso-chemie.eu/en/current-topics/downloads" },
        { id: 4, image: Brand4, link: "https://www.fuhr.de/en/service/downloads/" },
        { id: 5, image: Brand5, link: "https://aluris.rs/" },
        { id: 6, image: Brand6, link: "https://www.bonaiti.it/en/download/" },
        { id: 7, image: Brand7, link: "https://www.compacfoam.com/en/downloads/" },
        { id: 8, image: Brand8, link: "https://www.cortizo.com/en/descargas/desplegar" },
        { id: 9, image: Brand9, link: "https://deventer-profile.com/infomaterial.html" },
        { id: 10, image: Brand10, link: "https://www.dom-security.com/si/en/products?sort=alphabetically&page=0" },
        { id: 11, image: Brand11, link: "https://www.dormakaba.com/us-en/download-centre?sort.attribute=created_at&sort.order=desc" },
        { id: 12, image: Brand12, link: "https://catalogo.fapim.it/#/home" },
        { id: 13, image: Brand13, link: "https://www.hautau.de/en/downloads" },
        { id: 14, image: Brand14, link: "https://www.hoppe.com/se-en/contacts-service/downloads/catalogues-brochures/" },
        { id: 15, image: Brand15, link: "https://www.maco.eu/en-INT/Downloads" },
        { id: 16, image: Brand16, link: "https://www.monticelli.it/en/prodotti.html" },
        { id: 17, image: Brand17, link: "https://www.otlav.it/en/download" },
        { id: 18, image: Brand18, link: "https://www.simonswerk.com/service/download-centre/" },

        { id: 20, image: Brand20, link: "https://www.topp.it/en/product-selection-windows/" },


    ];

    return (
        <div className="w-[90%] lg:w-[86%] 2xl:w-[70%] mx-auto py-[2rem]">
            <h1 className="text-3xl text-center mt-[4rem] mb-[2rem]"> <Translated Key="catalogs" /></h1>
            <div className="grid grid-cols-5 gap-3 mt-[2rem]">
                {data?.map(({ id, image, link }) => {
                    return (
                        <div key={id} className="col-span-5 md:col-span-1">
                            <div className="border-[3px] max-md:border-[1px] max-md:m-[0.2rem] border-[#f5f5f5] py-[1rem] max-md:py-[0.6rem] max-md:px-[0.6rem] px-[3rem]">
                                <Link href={link} target="_blank">
                                    <Image
                                        src={image}
                                        alt="brand"
                                        width={300}
                                        height={140}
                                        quality={100}
                                        sizes={`100vw`}
                                        className={`max-h-[100px] hoverbrand`}
                                    />
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default Catalogs;