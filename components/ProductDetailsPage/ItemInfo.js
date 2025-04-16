"use client";
import { useEffect, useState } from "react";
import Variants from "../Variants/Variants";
import { useParams, useRouter } from "next/navigation";
import { useGlobalAddToCart, useGlobalAddToWishList } from "@/app/api/globals";
import { currencyFormat } from "@/helpers/functions";
import Translated from "../../context/state";
import Image from "next/image";
import { toast } from "react-toastify";
import Wishlist from "@/public/heart.png";
import WishlistActive from "@/public/heart-active.png";
import Cancel from "../../assets/Icons/cancel.png";
import { notFound } from "next/navigation";
import ProductPrice from "../ProductPrice/ProductPrice";
import PlusMinusInputOne from "../PlusMinusInputOne";
import SideviewProducts from "@/components/SideviewProducts";
import Link from "next/link";
import {
  useAddToCart,
  useAddToWishlist,
  useCart,
  useIsInWishlist,
  useRemoveFromWishlist,
} from "@/hooks/nimaco.hooks";
import { generateProductSchema } from "@/_functions";

const ItemInfo = ({ product, badge, canonical }) => {
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [productVariant, setProductVariant] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const path = useParams();
  const id = path?.path;

  const { data: cartItems, refetch } = useCart();
  const { mutate: add_to_cart, isSuccess } = useAddToCart();
  const { mutate: addToWishlist, isSuccess: isAddedToWishlist } =
    useAddToWishlist();
  const { mutate: removeFromWishist, isSuccess: isRemovedFromWishlist } =
    useRemoveFromWishlist();
  const { data: isInWishlist, refetch: refetchWishlist } = useIsInWishlist({
    id: product?.data?.item?.basic_data?.id_product,
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isAddedToWishlist || isRemovedFromWishlist) {
      refetchWishlist();
    }
  }, [isAddedToWishlist, isRemovedFromWishlist]);

  const addToCart = (e) => {
    if (product.product_type === "single") {
      add_to_cart({
        id: product.data.item.basic_data.id_product,
        quantity: count,
        message: "",
      });
      refetch();
      toast.success(
        `Proizvod ${product.data.item.basic_data?.name} dodat u korpu!`,
        {
          position: toast.POSITION.TOP_CENTER,
        },
      );
    } else {
      if (productVariant === null || productVariant?.length === 0) {
        toast.error("Morate izabrati varijantu proizvoda!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        add_to_cart({
          id: productVariant?.basic_data?.id_product,
          quantity: count,
        });
        refetch();
        toast.success(
          `Proizvod ${productVariant?.basic_data?.name} dodat u korpu!`,
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
      }
    }

    setTimeout(() => {
      setLoadingCart(false);
    }, 500);
    setCount(1);
  };

  const [newURL, setNewURL] = useState(null);
  useEffect(() => {
    if (newURL) {
      router.replace(`/${newURL}`, undefined, {
        shallow: true,
        scroll: false,
      });
    }
  }, [newURL]);

  const updateProductVariant = (newProduct) => {
    setProductVariant(newProduct);
  };

  const handleURLChange = (newURL) => {
    if (Array.isArray(newURL)) {
      newURL = newURL.join("/");
    } else {
      newURL = newURL;
    }
    setNewURL(newURL);
  };
  const [count, setCount] = useState(1);

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [returnModal, setReturnModal] = useState(false);

  useEffect(() => {
    const handleBodyScroll = () => {
      if (deliveryModal || infoModal || returnModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    };
    handleBodyScroll();
  }, [deliveryModal, infoModal, returnModal]);
  const [price, setPrice] = useState();
  const handlePrice = (price) => {
    setPrice(price);
  };

  const product_schema = generateProductSchema(product, [], canonical);

  return (
    <>
      {product ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
          />
          <div className="max-md:col-span-4 w-[100%] max-md:mb-[2rem] mb-[6rem] max-md:mt-[2rem]">
            <div className="flex flex-col mb-[2rem]">
              {badge?.[0]?.name ? (
                <div className="px-2 py-1 bg-croonus-3 w-fit text-white text-[0.8rem]">
                  <span>{badge?.[0]?.name}</span>
                </div>
              ) : null}
              {product?.data?.item?.price?.discount?.active && (
                <div className={` z-[10] text-white text-[13px]`}>
                  <div className={`bg-[#044e7b] w-fit px-2 py-3 rounded-full `}>
                    -
                    {(
                      ((product?.data?.item?.price?.price?.original -
                        product?.data?.item?.price?.price?.discount) /
                        product?.data?.item?.price?.price?.original) *
                      100
                    ).toFixed(0)}
                    %
                  </div>
                </div>
              )}
              <h1 className="text-3xl mt-[1rem] max-md:text-[1.6rem] font-bold lg:w-[90%] row3 leading-5 max-md:w-[93%]">
                {productVariant === null || productVariant.length === 0
                  ? product?.data?.item?.basic_data?.name
                  : productVariant?.basic_data?.name}
              </h1>
              <h2 className="mt-[1rem] max-md:mt-[0.4rem] text-[#636363] text-base">
                Šifra:&nbsp;
                {productVariant === null || productVariant.length === 0
                  ? product?.data?.item?.basic_data?.sku
                  : productVariant?.basic_data?.sku}
              </h2>

              <div className="mt-[2.125rem] text-2xl font-bold">
                {productVariant !== null && productVariant?.length !== 0 ? (
                  <>
                    <ProductPrice
                      price={productVariant?.price}
                      inventory={productVariant?.inventory}
                      handlePrice={handlePrice}
                    />{" "}
                    {productVariant?.price?.discount?.active && (
                      <span className={` line-through text-[13px]`}>
                        {currencyFormat(productVariant?.price?.price?.original)}
                      </span>
                    )}
                  </>
                ) : (
                  <div className="flex gap-3 ">
                    <ProductPrice
                      price={product?.data?.item?.price}
                      inventory={product?.data?.item?.inventory}
                      handlePrice={handlePrice}
                    />
                    {product?.data?.item?.price?.discount?.active && (
                      <span className={` line-through text-[14px] font-normal`}>
                        {currencyFormat(
                          product?.data?.item?.price?.price?.original,
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <p
                className="mt-[1rem] max-md:mt-[1.5rem] max-w-[90%] font-p font-regular max-md:w-[95%] text-base"
                dangerouslySetInnerHTML={{
                  __html: product?.data?.item?.basic_data?.short_description,
                }}
              ></p>
            </div>
            {product?.product_type === "variant" && (
              <div className="pt-[1rem] pb-[1.4rem] max-md:py-[0.8rem]">
                <Variants
                  firstVariantOption={false}
                  product={product}
                  productSlug={id}
                  handleURLChange={handleURLChange}
                  updateProductVariant={updateProductVariant}
                />
              </div>
            )}
            {/* <div className="flex items-center gap-2">
              <Image src={Measure} alt="measure" width={30} height={20} />
              <span className="text-[13px] font-bold">Pomoć za veličine</span>
            </div> */}

            <div className="mt-[4.188rem] max-md:mt-[2rem] flex items-center gap-[16px] md:gap-[31px] ">
              <PlusMinusInputOne amount={count} setCount={setCount} />
              {price !== "Cena na upit" ? (
                <button
                  className={
                    product.product_type === "variant" &&
                    (productVariant === null || productVariant.length === 0)
                      ? `w-[360px] max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center  justify-center text-white font-bold text-base bg-croonus-3`
                      : `w-[360px] max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center  justify-center text-white font-bold text-base bg-croonus-3`
                  }
                  onClick={() => {
                    setLoadingCart(true);
                    addToCart();
                    setOpenModal(true);
                  }}
                >
                  {loadingCart ? (
                    <Image
                      src={"/icons/loading-buffering.gif"}
                      alt="Loading"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <span>
                      <Translated Key="add_to_cart" />
                    </span>
                  )}
                </button>
              ) : (
                <button
                  disabled={
                    product.product_type === "variant" &&
                    (productVariant === null || productVariant.length === 0)
                  }
                  className={
                    product.product_type === "variant" &&
                    (productVariant === null || productVariant.length === 0)
                      ? `w-[360px] max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center cursor-not-allowed justify-center text-white font-bold text-base bg-croonus-3`
                      : `w-[360px] max-md:w-[260px] hover:bg-opacity-90 max-md:h-[40px] h-[58px] flex items-center  justify-center text-white font-bold text-base bg-croonus-3`
                  }
                  onClick={() => {
                    productVariant
                      ? router?.push(`/kontakt?slug=${productVariant?.slug}`)
                      : router?.push(
                          `/kontakt?slug=${product?.data?.item?.slug}`,
                        );
                  }}
                >
                  {loadingCart ? (
                    <Image
                      src={"/icons/loading-buffering.gif"}
                      alt="Loading"
                      width={30}
                      height={30}
                    />
                  ) : (
                    <span>Pošaljite upit</span>
                  )}
                </button>
              )}

              <div
                className="w-[39px] max-md:w-[33px] max-md:h-[33px] h-[35px] cursor-pointer"
                onClick={() => {
                  if (!isInWishlist?.exist) {
                    addToWishlist({
                      id: product?.data?.item?.basic_data?.id_product,
                    });
                  } else {
                    removeFromWishist({ id: isInWishlist?.wishlist_item_id });
                  }
                }}
              >
                <Image
                  src={isInWishlist?.exist ? WishlistActive : Wishlist}
                  alt="wishlist"
                  width={35}
                  height={35}
                  className="h-full object-contain"
                />
              </div>
            </div>
            <div className="mt-[5.125rem] max-md:mt-[2rem] max-md:flex max-md:items-center max-md:justify-center max-md:w-full">
              <ul className="flex flex-row gap-[47px] text-base relative separate">
                <div
                  className="relative cursor-pointer"
                  onClick={() => setDeliveryModal(true)}
                >
                  Dostava
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setInfoModal(true)}
                >
                  Informacije
                </div>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setReturnModal(true)}
                >
                  Povrat
                </div>
              </ul>
            </div>
          </div>
          <div
            className={
              deliveryModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Dostava</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setDeliveryModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Mesto isporuke poruče ne robe mora se nalaziti na teritoriji
                  Republike Srbije. Isporuku proizvoda poručenih na sajtu
                  nimaco.rs vrši kurirska služba „BEXEXPRESS DOO”, na teritoriji
                  Republike Srbije, radnim danima u periodu od 8 do 16h, na
                  adresu primaoca pošiljke.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  U slučaju da je na porudžbenici više artikala, velika je
                  verovatnoće da nemamo sve artikle na jednom mestu, zbog čega
                  ćete porudžbinu dobiti u više pošiljki. Nakon obrade
                  porudžbine, na vašu e-mail adresu stići će obaveštenje o
                  statusu porudžbine.
                </p>
                <p className="font-light mt-[30px] text-[15px]">
                  Po Zakonu o zaštiti potrošača, član 32 – Trgovac je dužan da u
                  roku od 30 dana od dana zaključenja ugovora na daljinu i
                  ugovora koji se zaključuje izvan poslovnih prostorija izvrši
                  isporuku robe. Okvirni rok isporuke je do 3 radna dana. Rok
                  isporuke može biti i duži od navedenog (3 radna dana), u
                  vanrednim slučajevima poput velikih gužvi, pandemija,
                  neprohodnosti puteva u slučaju vremenskih nepogoda i sl.
                  Kurirska služba je u obavezi da isporuku vrši što efikasnije u
                  skladu sa svojim mogućnostima i poslovnim kapacitetima.
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              infoModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Informacije</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setInfoModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Trenutno, jedini dostupan način plaćanja je pouzećem. To znači
                  da plaćanje vršite prilikom preuzimanja poručenih proizvoda.
                  Ovaj način plaćanja pruža vam dodatnu sigurnost i praktičnost.
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              returnModal
                ? `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-100 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
                : `max-md:z-[20000] fixed max-md:mx-auto max-md:overflow-y-scroll scale-0 transition-all duration-500 z-[101] top-0 left-0 w-screen h-screen flex items-center justify-center`
            }
          >
            <div
              className={`
          
              bg-white rounded-lg max-md:overflow-y-scroll  p-[40px] flex flex-col md:w-[890px] h-[490px]`}
            >
              <div className="flex items-center justify-between">
                <h1 className="text-[20px] font-bold">Povrat</h1>
                <Image
                  src={Cancel}
                  alt="cancel"
                  width={20}
                  height={20}
                  onClick={() => setReturnModal(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="mt-[4.375rem]">
                <p className="font-light text-[15px]">
                  Reklamacije se prihvataju u prvih 7 dana od datuma isporuke
                  proizvoda. Molimo vas da odmah obavestite naš tim za podršku o
                  bilo kakvim nedoumicama ili oštećenjima kako bismo brzo rešili
                  situaciju.
                </p>
                <p className="font-light mt-5 text-[15px]">
                  Ukoliko primetite prilikom prijema robe bilo kakvo ostecenje
                  na pakovanju duzni ste da fotografisete paket koji ste primili
                  I napravite zapisnik o oštećenju pošiljke sa kurirom koji Vam
                  je dostavio pošiljku. Primerak zapisnika fotografišete, a
                  fotografiju šaljete na email adresu{" "}
                  <a href={`mailto:reklamacijeb2c@nimaco.rs`}>
                    reklamacijeb2c@nimaco.rs
                  </a>{" "}
                  sa opisom problema u telu emaila.
                </p>
              </div>
            </div>
          </div>
          {(deliveryModal || infoModal || returnModal) && (
            <div
              className="fixed z-[100] bg-black bg-opacity-40 top-0 left-0 w-screen h-screen transition-all duration-500"
              onClick={() => {
                setDeliveryModal(false);
                setInfoModal(false);
                setReturnModal(false);
              }}
            ></div>
          )}
          <div
            className={
              openModal
                ? `border-l translate-x-0 fixed top-0 right-0 bg-white transition-all duration-500 z-[100] h-screen w-[90%] lg:w-[30%] 3xl:w-[20%] z-[602]`
                : `border-l translate-x-full fixed top-0 right-0 bg-white transition-all duration-500 z-[100] h-screen w-[90%] lg:w-[30%] 3xl:w-[20%] z-[602]`
            }
          >
            <div className={`p-5 overflow-y-auto h-full`}>
              <button onClick={() => setOpenModal(false)}>X</button>
              <h2 className={`text-[1.2rem] w-full pb-2 border-b mt-4`}>
                Pregled korpe
              </h2>
              <div className={`mt-5`}>
                <div className="flex flex-col gap-y-7">
                  {(cartItems ?? [])?.items?.map((item) => (
                    <SideviewProducts
                      item={item}
                      key={item?.cart?.cart_item_id}
                      refetch={refetch}
                    />
                  ))}
                  <Link
                    href="/korpa"
                    className={
                      "bg-croonus-3 py-3 px-5 text-white fixed bottom-1 left-2 w-[96%] font-bold text-center hover:bg-opacity-90 transition-all ease"
                    }
                  >
                    Završi kupovinu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        notFound()
      )}
    </>
  );
};

export default ItemInfo;
