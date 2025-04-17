"use client";
import { useProductThumb } from "@/hooks/nimaco.hooks";
import Link from "next/link";
import Image from "next/image";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import ProductPrice from "@/components/ProductPrice/ProductPrice";
import { currencyFormat } from "@/helpers/functions";
import NoImageImage from "../../assets/Images/no-image-nimaco.jpg";

export const ThumbSuspense = ({
  id,
  refetchWishlist = () => {},
  categoryId,
}) => {
  const { data: product } = useProductThumb({
    slug: id,
    id: id,
    categoryId: categoryId,
  });

  return (
    <Link
      href={`/${product?.link?.link_path}`}
      className={`col-span-1 aspect-2/3 relative flex flex-col group border border-[#ecebe5] hover:border-[#d0cec8] transition-all ease p-2 md:p-5 rounded-md`}
    >
      {product?.stickers?.length > 0 && (
        <div className={`absolute top-1 left-1 w-fit flex flex-col gap-3 z-30`}>
          {product?.stickers.map((sticker, index) => (
            <div
              key={index}
              className={`px-2 py-1 bg-croonus-3 text-white text-[0.8rem]`}
            >
              <span>{sticker.name}</span>
            </div>
          ))}
        </div>
      )}

      {product?.price?.discount?.active && (
        <div
          className={`absolute -right-1 -top-1 z-[10] text-white text-[13px]`}
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
      <div className={`relative`}>
        <Image
          src={convertHttpToHttps(product?.image?.[0]) || NoImageImage}
          alt={product?.basic_data?.name}
          width={0}
          height={0}
          sizes={`80vw`}
          className={`w-full h-auto`}
        />
        <div
          className={`absolute mx-auto 
    w-full 
    justify-center py-2 text-center 
    bg-croonus-3 text-croonus-2 z-50
    flex 
    group-hover:flex  mt-[25px]`}
        >
          <span className="">Saznajte više</span>
        </div>
      </div>
      <div className={`flex-col  flex relative z-[50] mt-20`}>
        <p
          className={`font-semibold text-base text-croonus-1 group-hover:text-croonus-3 line-clamp-2 max-md:text-[0.85rem]`}
        >
          {product?.basic_data?.name}
        </p>

        {/*<div className="mt-2 flex items-center">*/}
        {/*  <p className={`text-[0.9rem] text-[#939393] line-clamp-2 min-h-[42px]`}>*/}
        {/*    {product?.basic_data?.short_description}*/}
        {/*  </p>*/}
        {/*</div>*/}
      </div>
      <div
        className={`mt-10 w-full max-md:text-left max-md:items-start max-md:mt-1.5 flex items-center justify-center max-md:gap-1 gap-[10px] max-md:mr-auto bg-croonus-3 rounded-md py-1`}
      >
        <div className={`px-2 font-bold text-center`}>
          <ProductPrice
            price={product?.price}
            inventory={product?.inventory}
            className={`w-full`}
          />
        </div>
        {product?.price?.discount?.active && (
          <span className={`max-md:text-[#877372] line-through text-[13px]`}>
            {currencyFormat(product?.price?.price?.original)}
          </span>
        )}
      </div>
    </Link>
  );
};
