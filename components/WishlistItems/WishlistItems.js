import { useGlobalRemoveFromWishlist } from "@/app/api/globals";
import { currencyFormat } from "../../helpers/functions";
import Link from "next/link";
import Image from "next/image";
import classes from "./WishlistItem.module.css";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import { toast } from "react-toastify";
import ProductPrice from "../ProductPrice/ProductPrice";
const WishlistItems = ({ items, product }) => {
  const removeFromWishList = useGlobalRemoveFromWishlist();

  return (
    <div className="col-span-1 relative item">
      <div
        className={`${classes.item} max-md:h-[240px] md:h-[450px] lg:h-[350px] item relative`}
      >
        {product?.image[0] && (
          <Link href={`/${product?.slug}`} scroll={true}>
            <Image
              src={convertHttpToHttps(product?.image[0])}
              alt={product?.basic_data?.name}
              width={2222}
              height={2222}
              className="h-full object-cover"
            />
          </Link>
        )}
        <div className="absolute top-1 right-1 rounded-full bg-croonus-3 bg-opacity-80 hover:bg-opacity-40">
          <i
            className="fa-solid px-2 py-1 fa-times text-lg text-white"
            onClick={() => {
              removeFromWishList(items);
              toast.success(
                `Proizvod ${product?.basic_data?.name} je obrisan iz liste želja!`,
                {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                },
              );
            }}
          />
        </div>
        <div
          className={`${classes.more} absolute bottom-[0.1rem] mx-auto hidden w-[100%] justify-center py-2 text-center bg-croonus-3 text-croonus-2  max-lg:hidden z-50`}
        >
          {product?.categories?.length > 0 ? (
            <Link href={`/${product?.link?.link_path}`} key={product?.id}>
              <span className="">Saznajte više </span>
            </Link>
          ) : null}
        </div>
        {product?.stickers[0]?.name ? (
          <div className="px-2 py-1 absolute top-1 left-1 bg-croonus-3 w-fit text-white text-[0.8rem] ">
            <span>{product?.stickers[0]?.name}</span>
          </div>
        ) : null}
        {product?.price?.discount?.active && (
          <div
            className={`absolute -left-1 -top-1 z-[10] text-white text-[13px]`}
          >
            <div className={`bg-[#044e7b] px-2 py-3 rounded-full `}>
              -
              {(
                ((product?.price?.price?.original -
                  product?.price?.price?.discount) /
                  product?.price?.price?.original) *
                100
              ).toFixed(0)}
              %
            </div>
          </div>
        )}
      </div>
      {/* <div className="absolute  px-4 top-0 left-0 w-full h-full chevrons items-center justify-between">
            <div>
              <Image
                className="cursor-pointer rotate-180"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === 0) {
                    setImageIndex(product?.image.length - 1);
                  } else {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              />
            </div>
            <div>
              <Image
                className="cursor-pointer rotate-0"
                src={Chevron}
                alt="chevron"
                width={15}
                height={15}
                onClick={() => {
                  if (imageIndex === product?.image.length - 1) {
                    setImageIndex(0);
                  } else {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              />
            </div>
          </div> */}
      {product?.variant_options?.length > 0 ? (
        <div className="absolute rounded-lg py-5 left-3 bottom-[4rem] w-[95%] mx-auto bg-white chevrons">
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-[0.938rem] font-semibold text-center">
              Izaberi veličinu
            </h1>
            <div className="flex flex-row items-center justify-center gap-3 w-full mt-2">
              <>
                {product?.variant_options?.slice(0, 1).map((item2) => {
                  return (
                    <>
                      {item2?.values.map((item3) => {
                        return (
                          <>
                            <div className="rounded-full cursor-pointer flex items-center justify-center text-center text-xs w-[35px] h-[35px] border-[#7d7d7d] hover:border-[#242424] transition-all duration-500 border">
                              {item3?.name}
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={`${classes.item} mt-[0.813rem] flex-col flex relative z-[50] max-md:min-h-[3.8rem] min-h-[4.2rem]`}
      >
        <Link
          href={`/${product?.link?.link_path}`}
          className="text-[0.9rem] hover:text-croonus-3 font-semibold max-md:leading-4 clamp row1 w-[94%]"
        >
          {product?.basic_data?.name}
        </Link>

        <span className="rows2 text-[0.8rem] text-[#a0a0a0] font-light">
          {product?.basic_data?.short_description}
        </span>
      </div>
      <div className="mt-0 max-md:text-left max-md:items-start max-md:mt-1.5 flex items-center justify-center max-md:gap-1 gap-[10px] max-md:mr-auto bg-croonus-3 rounded-md py-1">
        <div className={`px-2 font-bold text-center`}>
          <ProductPrice price={product?.price} inventory={product?.inventory} />
        </div>
        {product?.price?.discount?.active && (
          <span className={`max-md:text-[#877372] line-through text-[13px]`}>
            {currencyFormat(product?.price?.price?.original)}
          </span>
        )}
      </div>
      <div
        className={`${classes.more} mx-auto lg:hidden w-[100%] justify-center py-2 text-center bg-croonus-3 text-croonus-2 z-50 rounded-md mt-2`}
      >
        {product?.categories?.length > 0 ? (
          <Link href={`/${product?.link?.link_path}`} key={product?.id}>
            <span className="">Saznajte više </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default WishlistItems;
