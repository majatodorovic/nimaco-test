"use client";
import Image from "next/image";
import Logo from "../../assets/Images/logo.png";
import DarkLogo from "../../assets/Images/nimaco-logo-dark.png";
import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Search from "../../assets/Icons/search.png";
import Wishlist from "../../assets/Icons/heart.png";
import MobileLanguageSelector from "../MobileLanguageSelector/MobileLanguageSelector";
import Cart from "../../assets/Icons/cart.png";
import { useCartContext } from "@/app/api/cartContext";
import { get, list } from "@/app/api/api";
import Menu from "../../assets/Icons/hamburger.png";

import defaultimage from "@/assets/Images/missingphoto.jpg";
import { useSearch } from "@/hooks/nimaco.hooks";

const NavigationMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    const getCategories = async () => {
      const data = await get("/categories/product/tree").then((response) =>
        setCategories(response?.payload),
      );
    };
    getCategories();
  }, []);
  // useEffect(() => {
  //   const disableBodyScroll = () => {
  //     isOpen && (document.body.style.overflow = "hidden");
  //   };
  //   disableBodyScroll();

  //   return () => {
  //     document.body.style.overflow = "visible";
  //   };
  // }, [isOpen]);

  const getCartCount = useCallback(() => {
    get("/cart/badge-count")
      .then((response) => {
        setCartCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  const getWishlistCount = useCallback(() => {
    get("/wishlist/badge-count")
      .then((response) => {
        setWishListCount(response?.payload?.summary?.items_count ?? 0);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    getWishlistCount();
  }, [getWishlistCount, wishList]);

  useEffect(() => {
    getCartCount();
  }, [getCartCount, cart]);

  useEffect(() => {
  if (isOpen) {
    document.documentElement.style.overflow = 'hidden';  // Applies to html
    document.body.style.overflow = 'hidden';              // Applies to body
  } else {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }

  return () => {
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };
}, [isOpen]);


  const handleCategoryClick = (categoryId) => {
    if (selectedCategoryId === categoryId) {
      // If the clicked category is already selected, toggle its subcategories
      setSubcategory(!subcategory);
    } else {
      // Otherwise, select the new category and show its children
      setSelectedCategoryId(categoryId);
      setSubcategory(true); // Show children when a category is selected
    }
  };


  const { push: navigate, asPath } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm?.length >= 3) {
      setSearchIsOpen(false);
      router.push(`/pretraga?search=${searchTerm}`);
      setSearchTerm("");
      setSearch("");
    }
  };

  const { data: searchData, isLoading: loading } = useSearch({
    searchTerm: searchTerm,
    isSearchPage: false,
  });

  const [subcategory, setSubcategory] = useState(false);

  return (
    <>
      <div className="sticky bg-[#044e7b] bg-opacity-80 backdrop-blur-md z-[80] top-0 block lg:hidden">
        <div className=" p-3  flex flex-row items-center justify-between ">
          <div className="flex items-center gap-5">
            <Image
              src={Menu}
              alt="Menu"
              width={25}
              height={25}
              className="invert"
              onClick={() => setIsOpen(!isOpen)}
            />
            <div>
              <Link href="/">
                <Image src={Logo} alt="Logo" width={120} height={120} />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Image
              src={Search}
              alt="Search"
              width={20}
              height={20}
              className="invert"
              onClick={() => setSearchIsOpen(!searchIsOpen)}
            />
            <div className="relative">
              <Link href="/lista-zelja">
                {" "}
                <Image src={Wishlist} alt="Wishlist" width={20} height={20} />
              </Link>
              <span className="absolute text-xs -top-3 -right-3 bg-croonus-3 px-1.5 rounded-full">
                {wishListCount}
              </span>
            </div>{" "}
            <div className="relative">
              <Link href="/korpa">
                <Image src={Cart} alt="Cart" width={20} height={20} />
              </Link>
              <span className="absolute text-xs -top-3 -right-2 bg-croonus-3 px-1.5 rounded-full">
                {cartCount}
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            searchIsOpen
              ? `h-full w-full flex items-center justify-start  absolute z-[61] bg-white shadow-black shadow-2xl transition-all duration-[550ms] translate-y-0`
              : `h-full w-full flex items-center justify-start  absolute z-[61] bg-white  transition-all duration-[550ms] -translate-y-[200%]`
          }
        >
          <form
            onSubmit={handleSearch}
            className="relative flex px-3 w-full items-center justify-between"
          >
            <div className="flex items-center justify-center gap-5 relative">
              <input
                type="text"
                placeholder="Pretraži proizvode"
                className="w-[300px] h-10 border-b border-l-0 border-t-0 border-r-0 border-b-gray-300 focus:outline-none focus:border-b-croonus-2 focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm?.length < 3 && searchTerm?.length >= 1 && (
                <span
                  className={`absolute text-xs top-3 right-[3rem] text-red-500`}
                >
                  Unesite najmanje 3 karaktera
                </span>
              )}
              <Image
                src={Search}
                alt="search"
                width={20}
                height={20}
                className="absolute right-2 cursor-pointer fa-solid fa-search text-gray-400"
              />
            </div>

            <i
              className="fa-solid fa-xmark text-2xl cursor-pointer"
              onClick={() => {
                setSearchIsOpen(!searchIsOpen);
                setSearchTerm("");
                setSearch("");
              }}
            ></i>
          </form>
          {searchTerm?.length >= 3 ? (
            <div className="absolute top-[100%] w-full bg-white shadow-xl rounded-b-lg  ">
              <div className="flex flex-col gap-2 w-full relative">
                <div className="max-h-[400px] overflow-y-auto customscroll2">
                  {searchData?.items?.length > 0
                    ? searchData?.items?.slice(0, 6).map((item) => (
                        <Link
                          href={`/${item?.link?.link_path}`}
                          className="h-[83px]"
                          onClick={() => {
                            setSearchTerm("");
                            setSearch("");
                          }}
                        >
                          <div className="flex items-center justify-between p-2.5 hover:bg-croonus-3 cursor-pointer">
                            <div className="flex items-center p-1 gap-5">
                              {item?.image?.[0]?.toString() ? (
                                <Image
                                  src={item?.image?.[0]?.toString()}
                                  width={50}
                                  height={50}
                                  alt="Nimaco"
                                  className="h-full object-contain"
                                />
                              ) : (
                                <div className=" relative">
                                  <Image
                                    src={defaultimage}
                                    alt="Nimaco"
                                    width={60}
                                    height={60}
                                    className={`object-cover rounded-full`}
                                  />
                                </div>
                              )}
                              <div className="flex flex-col gap-1">
                                <p className="text-sm font-semibold line-clamp-1">
                                  {item?.basic_data?.name}
                                </p>
                                <p className="italic text-xs">
                                  U kategoriji {item?.categories[0]?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    : null}
                </div>
                {searchData?.items?.length > 6 && (
                  <div
                    className="flex py-1.5 justify-center items-center sticky bottom-0 w-full bg-croonus-3 text-white hover:bg-opacity-90 cursor-pointer"
                    onClick={handleSearch}
                  >
                    {searchData?.items?.length > 6 ? (
                      <span>
                        Prikaži sve rezultate ( još&nbsp;
                        {searchData?.items?.length - 6} )
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div
        className={
          isOpen
            ? ` translate-x-0 transition-all duration-500 fixed flex flex-col z-[100] left-0 top-0 h-[100dvh] w-[90%] bg-white bg-opacity-100 shadow-2xl`
            : `-translate-x-[100%] transition-all duration-500 fixed flex flex-col z-[100] left-0 top-0 h-[100dvh] w-[90%] bg-white bg-opacity-100 `
        }
      >
        <div className="flex flex-row p-3 justify-between items-center">
          <Link href="/">
            {" "}
            <Image src={DarkLogo} alt="Logo" width={150} height={150} />
          </Link>
          <MobileLanguageSelector options={["English", "Srpski", "Српски"]} />
          <i
            className="fa-solid fa-xmark text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          ></i>{" "}
        </div>

        <div className="flex flex-col mt-10 max-h-[464px] overflow-y-auto">
          {categories?.map((item, index) => (
            <>
              {item.children ? (
                <>
                  <div
                    key={item.id}
                    className={`p-3 flex items-center justify-between ${
                      index % 2 === 0 ? "bg-croonus-3 text-white" : ""
                    }`}
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    <p key={item?.id} className="uppercase font-medium">
                      {item.name}
                    </p>
                    {item.children ? (
                      <i
                        key={item?.id}
                        className="fa-solid fa-chevron-right text-sm"
                      ></i>
                    ) : null}
                  </div>
                </>
              ) : (
                <Link
                  href={`/${item?.link?.link_path}`}
                  className="uppercase font-medium"
                  key={item?.id}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    key={item.id}
                    className={`p-3 flex items-center justify-between ${
                      index % 2 === 0 ? "bg-croonus-3 text-white" : ""
                    }`}
                  >
                    <p
                      className="uppercase font-medium"
                      onClick={() => setIsOpen(false)}
                      key={item?.id}
                    >
                      {item.name}
                    </p>
                    {item.children ? (
                      <i
                        key={item?.id}
                        className="fa-solid fa-chevron-right text-sm"
                      ></i>
                    ) : null}
                  </div>
                </Link>
              )}

              {subcategory && item?.children
                ? item?.children?.map((child) => {
                  if(child.parent_id == selectedCategoryId) {
                    return (
                      <Link
                        href={`/${child?.link?.link_path}`}
                        onClick={() => {
                          setIsOpen(false);
                          setSubcategory(false);
                        }}
                        className={
                          subcategory && item?.children
                            ? `p-3 pl-10 translate-x-0 duration-500 transition-all uppercase font-medium text-sm`
                            : `p-3 pl-10 =translate-x-full duration-500 transition-all uppercase font-medium text-sm`
                        }
                        key={child?.id}
                      >
                        {child?.name}
                      </Link>
                    );
                  }
                  })
                : null}
            </>
          ))}
        </div>
        <div className="flex mt-auto flex-col gap-4 p-3 text-white bg-croonus-3">
          <a
            className="uppercase font-medium"
            href="https://b2b.nimaco.rs/"
            onClick={() => setIsOpen(false)}
          >
            {" "}
            <div className="flex items-center justify-between">
              B2B
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </div>
          </a>
          <Link
            className="uppercase font-medium"
            href="/katalozi"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center justify-between">
              Katalozi <i className="fa-solid fa-chevron-right text-sm"></i>
            </div>
          </Link>
          <Link
            className="uppercase font-medium"
            href="/o-nama"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center justify-between">
              O nama <i className="fa-solid fa-chevron-right text-sm"></i>
            </div>
          </Link>
          <Link
            className="uppercase font-medium"
            href="/kontakt"
            onClick={() => setIsOpen(false)}
          >
            {" "}
            <div className="flex items-center justify-between">
              Kontakt
              <i className="fa-solid fa-chevron-right text-sm"></i>
            </div>
          </Link>
        </div>
      </div>
      <div
        className={
          searchIsOpen
            ? `h-[100dvh] w-full bg-black bg-opacity-50 fixed top-0 left-0 z-[70] transition-all duration-500`
            : `h-[100dvh] w-full bg-black bg-opacity-0 invisible fixed top-0 left-0 z-[70] transition-all duration-500`
        }
        onClick={() => {
          setSearchIsOpen(!searchIsOpen);
          setSearch("");
          setSearchTerm("");
        }}
      ></div>
      {isOpen && (
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 w-full h-full z-[70]"></div>
      )}
    </>
  );
};

export default NavigationMobile;
