import { useEffect, useState } from "react";
import Image from "next/image";
import { useGlobalAddToCart } from "@/app/api/globals";
import { useGlobalRemoveFromCart } from "@/app/api/globals";
import { currencyFormat } from "../helpers/functions";
import RemoveProductModal from "./RemoveProductModal/RemoveProductModal";
import classes from "./CartProductItem.module.css";
import PlusMinusInputTwo from "./PlusMinusInputTwo";
import { convertHttpToHttps } from "@/helpers/convertHttpToHttps";
import Link from "next/link";
import {
  useRemoveFromCart,
  useCart,
  useAddToCart,
  useUpdateCartQuantity,
} from "@/hooks/nimaco.hooks";
import { toast } from "react-toastify";

const SideviewProducts = ({ item, refetch }) => {
  const [productAmount, setProductAmount] = useState(
    Number(item.cart.quantity),
  );

  const { mutate: remove_from_cart, isSuccess } = useRemoveFromCart();
  const { mutate: updateQuantity, isSuccess: isUpdated } =
    useUpdateCartQuantity();

  useEffect(() => {
    if (isSuccess || isUpdated) {
      refetch();
    }
  }, [isSuccess, isUpdated]);

  const removeFromCart = (e) => {
    remove_from_cart({ id: item.product.basic_data.id_product });
    refetch();
  };

  const total = item?.product?.price?.cost;
  const currency = item?.product?.price?.currency;

  return (
    <>
      <div className="col-span-2 grid grid-cols-3 gap-x-10 mt-1 relative">
        <div className="relative col-span-1 w-full flex items-center justify-center">
          <div className="xl:h-[186px] max-md:h-[150px] max-md:w-[150px] xl:w-[139px]  ">
            <Link href={`/${item?.product?.link?.link_path}`}>
              <Image
                src={convertHttpToHttps(item?.product?.image[0])}
                width={250}
                height={250}
                alt=""
                className="object-contain h-full"
              />
            </Link>
          </div>
        </div>
        <div className="col-span-2 flex  flex-col ">
          <Link href={`/${item?.product?.link?.link_path}`}>
            <span className="text-md font-bold break-all row2">
              {item?.product?.basic_data?.name}
            </span>
          </Link>
          <div className="flex flex-col gap-2 text-sm">
            <span className="mt-5">
              Šifra: {item?.product?.basic_data?.sku}
            </span>
            <div className="flex items-center gap-3 max-md:hidden text-sm">
              <span>Količina</span>

              <PlusMinusInputTwo
                amount={productAmount}
                setCount={setProductAmount}
                updateCart={updateQuantity}
                id={item?.cart?.cart_item_id}
              />
            </div>
            <div className="flex items-center gap-3 md:hidden text-base">
              <span>Količina:</span>
              {item.cart.quantity}
            </div>
            <span>
              Ukupan iznos:{" "}
              <span className="font-bold">
                {currencyFormat(total?.with_vat, currency)}
              </span>{" "}
              sa PDV
            </span>
          </div>
        </div>
        <span
          className="absolute -top-4 right-2 cursor-pointer"
          onClick={() => removeFromCart()}
        >
          X
        </span>
      </div>
    </>
  );
};

export default SideviewProducts;
