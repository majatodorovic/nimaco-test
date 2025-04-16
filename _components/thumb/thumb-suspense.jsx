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
      className={`
        col-span-1 
        w-full 
        flex flex-col 
        group 
        border border-[#ecebe5] 
        hover:border-[#d0cec8] 
        transition-all ease 
        p-3 md:p-5 
        rounded-md
        bg-white
      `}
    >
      {/* Stickers */}
      {product?.stickers?.length > 0 && (
        <div className="absolute top-1 left-1 z-30 flex flex-col gap-2">
          {product.stickers.map((sticker, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-croonus-3 text-white text-xs rounded"
            >
              {sticker.name}
            </span>
          ))}
        </div>
      )}

      {/* Discount badge */}
      {product?.price?.discount?.active && (
        <div className="absolute top-1 right-1 z-30 text-white text-[13px]">
          <div className="bg-[#044e7b] px-3 py-2 rounded-full">
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

      {/* Image */}
      <div className="relative w-full aspect-[1/1] mb-3 rounded">
        <Image
          src={convertHttpToHttps(product?.image?.[0]) || NoImageImage}
          alt={product?.basic_data?.name || "Product image"}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        {/* Saznajte više tekst */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-1 bg-croonus-3 text-croonus-2 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 md:block transition-opacity duration-200">
          Saznajte više
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col mt-auto z-10 mb-2">
        <p className="font-semibold text-base text-croonus-1 group-hover:text-croonus-3 line-clamp-2 max-sm:text-sm">
          {product?.basic_data?.name}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 justify-start bg-croonus-3 rounded-md px-2 py-1">
        <ProductPrice
          price={product?.price}
          inventory={product?.inventory}
          className="font-bold text-sm text-croonus-2"
        />
        {product?.price?.discount?.active && (
          <span className="text-[13px] line-through text-[#877372]">
            {currencyFormat(product?.price?.price?.original)}
          </span>
        )}
      </div>
    </Link>
  );
};
