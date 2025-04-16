"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { get, list, post } from "@/app/api/api";
import { useCartContext } from "@/app/api/cartContext";
import { useRouter, usePathname } from "next/navigation";
import Translated from "../../context/state";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/Images/logo.png";
import Cart from "../../assets/Icons/cart.png";
import Wishlist from "../../assets/Icons/heart.png";
import useDebounce from "@/hooks/useDebounce";
import { useSearch } from "@/hooks/nimaco.hooks";
import Search from "@/assets/Icons/search.png";
import { currencyFormat } from "@/helpers/functions";
import defaultimage from "@/assets/Images/missingphoto.jpg";

const Navigation = () => {
  const { push: navigate, asPath } = useRouter();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [cart, , wishList] = useCartContext();
  const [wishListCount, setWishListCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();
  const [subCategory, setSubcategory] = useState(false);
  let category = false;

  const [isActive, setIsActive] = useState(1);
  const [activeCategory, setActiveCategory] = useState();
  const [height, setHeight] = useState(0);

  if (pathname === "/") {
    category = false;
  } else {
    category = true;
  }
  const [message, setMessage] = useState({
    errorCart: false,
    messageCart: "",
    errorWishlist: false,
    messageWishlist: "",
  });
  const myRef = useRef(null);
  useEffect(() => {
    const getCategories = async () => {
      const getCategories = await get("/categories/product/tree").then(
        (response) => setCategories(response.payload),
      );
    };
    getCategories();
  }, []);
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
  }, [getCartCount, cart, cartCount]);

  const handleButtonClickWishList = () => {
    if (wishListCount === 0) {
      setShowDivWishListCount(!showDivWishListCount);
    } else {
      router.push("/lista-zelja");
    }
  };

  const handleCloseClickWishlist = () => {
    setShowDivWishListCount(false);
  };
  const handleOutsideClick = (e) => {
    if (myRef.current && !myRef.current.contains(e.target)) {
      setShowDivWishListCount(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm?.length >= 3) {
      setSearchIsOpen(false);
      router.push(`/pretraga?search=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isFetching } = useSearch({
    searchTerm: debouncedSearch,
    isSearchPage: false,
  });

  useEffect(() => {
    if (searchTerm?.length > 0) {
      const getData = async (debouncedSearch) => {
        await list(`/products/search/list`, {
          search: debouncedSearch,
        }).then((response) => {
          setSearchData(response?.payload);
          setLoading(false);
        });
      };
      getData(debouncedSearch);
    }
  }, [debouncedSearch]);

  const searchRef = useRef(null);
  const searchImgRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !searchImgRef.current.contains(event.target)
      ) {
        setSearchTerm("");
        setSearchData([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !searchImgRef.current.contains(event.target)
      ) {
        setSearchTerm("");
        setSearchData([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {
    const category = categories.filter((category) => category?.id === isActive);
    setIsActive(category[0]?.id);
  }, [isActive]);

  useEffect(() => {
    const slider = document.getElementById("slider");
    const sliderHeight = slider?.offsetHeight;
    setHeight(sliderHeight);
  });
  const [open, setOpen] = useState(false);
  const [isActiveSubcategory, setIsActiveSubcategory] = useState({
    id: undefined,
    slug: undefined,
  });
  const [activeSubSubCategory, setActiveSubSubCategory] = useState();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible((scrollY === 0 && pathname === "/") || (open && scrollY > 0));
      pathname?.includes("/kategorija" || "") &&
        setVisible(false) &&
        setOpen(false);

      setSubcategory(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open, pathname]);

  useEffect(() => {
    setVisible(true);
  }, [open]);

  useEffect(() => {
    if (categories) {
      setIsActive(categories[0]?.id);

      setActiveCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    if (pathname?.includes("/korpa/")) {
      router?.refresh();
    }
  }, [pathname]);

  useEffect(() => {
    const handleMouseOutsideOfBrowserViewport = (event) => {
      if (event.clientY <= 0) {
        setOpen(false);
        setSubcategory(false);
      }
    };

    window.addEventListener("mousemove", handleMouseOutsideOfBrowserViewport);
    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseOutsideOfBrowserViewport,
      );
    };
  }, []);

  useEffect(() => {
    if (pathname?.includes("/kategorija" || "")) {
      setOpen(false);
      setVisible(false);
      setSubcategory(false);
    }
  }, [pathname]);
  return (
    <>
      <div className="bg-[#044e7b] hidden lg:block sticky pt-5 pb-4 top-0 z-[600]">
        <div className="w-[90%] mx-auto flex items-center justify-between relative max-2xl:w-full max-2xl:px-6">
          <div className="mr-4">
            <Link href="/">
              <Image src={logo} alt="Nimaco logo" width={120} height={120} />
            </Link>
          </div>
          <div className="flex xl:ml-[60px] ml-[10px] items-center gap-3 mr-auto w-[50%] ">
            <Link href="/" className="pr-5 pl-5">
              <i className="fa-solid fa-home text-[#4ebdd7] text-lg"></i>
            </Link>
            <div className="relative">
              <h1
                onClick={() => setOpen(!open)}
                className="text-white  lg:text-base text-sm uppercase font-medium bg-[#4ebdd7] rounded-[.5rem] xl:px-5 px-3 py-1.5 hover:bg-opacity-80 cursor-pointer"
              >
                <Translated Key="products" />
              </h1>
              <div
                className={
                  open
                    ? ` z-[99] flex  w-fit transition-all duration-[600ms] absolute top-[4rem] left-0 bg-[#044e7b] text-white`
                    : `hidden z-[99] flex  w-fit lg:w-[76%] 2xl:w-[64%] transition-all duration-[600ms] left-0 absolute top-[4rem] bg-[#044e7b] text-white `
                }
              >
                <div className="w-full h-[70%] my-auto mx-auto flex justify-start items-start bg-white">
                  <div className="flex flex-col gap-3 2xl:max-h-[500px] 3xl:max-h-[680px] min-w-max overflow-y-scroll hidescroll  h-full bg-[#044e7b] shadowcustom">
                    <div className="flex flex-col py-[5px]">
                      <div className="flex flex-col my-2 ml-2 mr-4">
                        {(categories ?? [])?.map((item) => {
                          return item?.children ? (
                            <Link
                              key={item.id}
                              href={`/${item?.link?.link_path}`}
                              className={`cursor-pointer  px-3 py-1 text-croonus-1 hover:bg-white/40 text-white  rounded-sm text-sm ${subCategory[0]?.parent_id === item.id ? "bg-white/40" : ""}`}
                              onClick={() => setOpen(false)}
                              onMouseEnter={() => {
                                item?.children
                                  ? setSubcategory(item?.children)
                                  : setSubcategory([]);
                              }}
                            >
                              {item?.name}
                            </Link>
                          ) : (
                            <Link
                              href={`/${item?.link?.link_path}`}
                              onMouseEnter={() => {
                                item?.children
                                  ? setSubcategory(item?.children)
                                  : setSubcategory([]);
                              }}
                              key={item?.id}
                              className="px-3 py-1 text-croonus-1  text-white hover:bg-white/40 rounded-sm text-sm"
                              onClick={() => setOpen(false)}
                            >
                              {item?.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {subCategory?.length > 0 ? (
                    <>
                      {subCategory?.some(
                        (item) => item?.children && item?.children.length > 0,
                      ) ? (
                        <div className=" self-start xl:pl-[22px] 3xl:pl-[30px] hidescroll overflow-y-scroll h-[100%] my-auto transition ease-in-out delay-150 bg-white text-black py-4 w-[300px]">
                          {subCategory?.map((item) => (
                            <div className=" py-4" key={item.id}>
                              <Link
                                href={`/${item?.link?.link_path}`}
                                onClick={() => {
                                  setOpen(false);
                                  setSubcategory([]);
                                }}
                              >
                                <h1 className="text-sm font-light hover:underline">
                                  {item?.name}
                                </h1>
                              </Link>
                              <div className="mt-5 pl-2 ">
                                {item?.children
                                  ? item?.children?.map((child) => (
                                      <Link
                                        href={`/${child?.link?.link_path}`}
                                        key={child?.id}
                                        onClick={() => {
                                          setOpen(false);
                                          setSubcategory([]);
                                        }}
                                      >
                                        <div className="text-sm font-light py-1 px-1 hover:bg-croonus-2 whitespace-nowrap w-max">
                                          <p className="">{child?.name}</p>
                                        </div>
                                      </Link>
                                    ))
                                  : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-[300px] self-start xl:pl-[22px] 3xl:pl-[30px] customscroll overflow-y-scroll transition ease-in-out delay-150 text-black py-4 px-4 h-[220px]">
                          {subCategory?.map((item) => (
                            <div className="h-fit" key={item.id}>
                              <Link
                                href={`/${item?.link?.link_path}`}
                                onClick={() => {
                                  setOpen(false);
                                  setSubcategory([]);
                                }}
                              >
                                <h1 className="text-sm font-light hover:underline">
                                  {item?.name}
                                </h1>
                              </Link>
                              <div className="mt-2 pl-2 ">
                                {item?.children
                                  ? item?.children?.map((child) => (
                                      <Link
                                        href={`/${child?.link?.link_path}`}
                                        key={child?.id}
                                        onClick={() => {
                                          setOpen(false);
                                          setSubcategory([]);
                                        }}
                                      >
                                        <div className="text-sm font-light py-1 px-1 hover:bg-croonus-2">
                                          <p className="">{child?.name}</p>
                                        </div>
                                      </Link>
                                    ))
                                  : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <Link
              href={"https://b2b.nimaco.rs/"}
              onClick={() => setOpen(false)}
              target={"_blank"}
              className="text-white lg:text-base text-sm uppercase font-medium hover:bg-[#4ebdd7] rounded-[.5rem] px-2 xl:px-5 py-2"
            >
              B2B
            </Link>
            <Link
              href={"/katalozi"}
              className={`text-white lg:text-base text-sm uppercase font-medium hover:bg-[#4ebdd7] rounded-[.5rem] px-2 xl:px-5 py-2 ${
                pathname?.includes("/katalozi") ? "bg-[#4ebdd7]" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <Translated Key="catalogs" />
            </Link>
            <Link
              href={"/o-nama"}
              className={`text-white lg:text-base text-sm uppercase font-medium hover:bg-[#4ebdd7] rounded-[.5rem] whitespace-nowrap px-2 xl:px-5 py-2 ${
                pathname?.includes("/o-nama") ? "bg-[#4ebdd7]" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <Translated Key="about_us" />
            </Link>
            <Link
              href={"/kontakt"}
              onClick={() => setOpen(false)}
              className={`text-white lg:text-base text-sm uppercase font-medium hover:bg-[#4ebdd7] rounded-[.5rem] px-2 xl:px-5 py-2  ${
                pathname?.includes("/kontakt") ? "bg-[#4ebdd7]" : ""
              }`}
            >
              <Translated Key="contact" />
            </Link>
          </div>
          <form
            onSubmit={(e) => handleSearch(e)}
            className="w-[16rem] 3xl:w-96 relative xl:mr-[45px] ml-auto"
          >
            <input
              type="text"
              className="bg-white placeholder:text-xs text-xs py-3 placeholder:text-black focus:shadow-none text-black rounded-[.5rem] xl:w-full w-[90%] ml-auto border-none"
              placeholder="Unesite termin za pretragu..."
              onInput={(event) => {
                setSearchTerm(event.target.value);
                if (event.target.value.length >= 3) {
                  setLoading(true);
                }
              }}
              value={searchTerm}
            />
            {searchTerm?.length < 3 && searchTerm?.length >= 1 && (
              <span
                className={`absolute text-xs top-3 right-[3rem] text-red-500`}
              >
                Unesite najmanje 3 karaktera
              </span>
            )}
            <div className="absolute top-2 right-2">
              <Image
                ref={searchImgRef}
                src={Search}
                width={22}
                height={22}
                alt="Nimaco"
                onClick={handleSearch}
              />
            </div>
            <div
              ref={searchRef}
              className={`${
                searchTerm?.length >= 3
                  ? `absolute flex flex-col h-[420px] hidescrollbar overflow-y-auto bg-white top-[30px] right-0 w-full border rounded-b-lg`
                  : `hidden`
              } `}
            >
              {searchData?.items?.length > 0 && searchTerm?.length > 0 && (
                <div className="w-[95%] mx-auto mt-5">
                  <h1 className="text-[1rem] font-normal">
                    Rezultati pretrage
                  </h1>
                  <div className="flex flex-col gap-5 mt-3 pb-5">
                    {searchData?.items?.slice(0, 6)?.map((item) => {
                      return (
                        <Link
                          href={`/${item?.link?.link_path}`}
                          onClick={(e) => {
                            setSearchData([]);
                            setSearchTerm("");
                          }}
                        >
                          <div className="flex flex-row items-center gap-5">
                            {item?.image[0] ? (
                              <div className=" relative">
                                <Image
                                  src={item?.image[0]}
                                  alt="Nimaco"
                                  width={60}
                                  height={60}
                                  className={`object-cover rounded-full h-[60px]`}
                                />
                              </div>
                            ) : (
                              <div className=" relative">
                                <Image
                                  src={defaultimage}
                                  alt="Nimaco"
                                  width={60}
                                  height={60}
                                  className={`object-cover rounded-full h-[60px]`}
                                />
                              </div>
                            )}
                            <div className="flex flex-col gap-1">
                              <h1 className="text-[0.9rem] font-normal">
                                {item?.basic_data?.name}
                              </h1>
                              <h1 className="text-[0.9rem] w-fit font-bold text-center">
                                {currencyFormat(
                                  item?.price?.price?.discount ??
                                    item?.price?.price?.original,
                                )}
                              </h1>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
              {loading && (
                <div className={`w-[95%] mx-auto text-center mt-5`}>
                  <i
                    className={`fas fa-spinner fa-spin text-xl text-black`}
                  ></i>
                </div>
              )}
              {!loading && (
                <div
                  className={`sticky bottom-0 w-full bg-croonus-2 py-2 mt-auto text-center hover:bg-opacity-80`}
                >
                  <button
                    onClick={() => {
                      handleSearch();
                      setSearchData([]);
                    }}
                    className={` w-full h-full font-light text-center`}
                  >
                    Prikaži sve rezultate (
                    {searchData?.pagination?.total_items > 10
                      ? `još ${searchData?.pagination?.total_items - 10}`
                      : `Pretraži`}
                    )
                  </button>
                </div>
              )}
            </div>
          </form>

          {searchIsOpen ? (
            <div
              onClick={() => {
                setSearchIsOpen(false);
                setSearchTerm("");
                setSearch("");
              }}
              className="bg-black bg-opacity-40 w-full fixed w-screen h-screen z-1 left-0 top-0"
            ></div>
          ) : null}
          <div className="flex items-center xl:gap-5 gap-2">
            <div className="w-full relative">
              {wishListCount > 0 ? (
                <Link href="/lista-zelja">
                  <Image
                    src={Wishlist}
                    alt="wishlist"
                    width={30}
                    height={30}
                    className="cursor-pointer  hover:translate-y-0.5 transition-all ease"
                  />
                </Link>
              ) : (
                <>
                  <Image
                    src={Wishlist}
                    width={29}
                    height={29}
                    alt="Nimaco"
                    className="cursor-pointer  hover:translate-y-0.5 transition-all ease"
                    onClick={() =>
                      setMessage({
                        errorWishlist: !message?.errorWishlist,
                        messageWishlist: "Vaša lista želja je prazna.",
                      })
                    }
                  />
                  {message.errorWishlist && (
                    <div className="absolute z-[1500]  bg-white w-96 p-1.5 rounded-xl 2xl:-left-80 3xl:-left-72 top-9">
                      <div className="border-2 rounded-xl p-3.5">
                        <span className="font-medium">
                          {message?.messageWishlist}
                        </span>
                        <p className="w-[80%] text-sm">
                          Da biste videli sadržaj ove stranice, prvo morate
                          dodati artikle u listu želja.
                        </p>
                        <i
                          className="fa-solid fa-x absolute top-4 right-4 text-xs hover:text-red-500 cursor-pointer"
                          onClick={() =>
                            setMessage({
                              errorWishlist: !message?.errorWishlist,
                            })
                          }
                        ></i>
                      </div>
                    </div>
                  )}
                </>
              )}

              <span className="absolute -top-3 -right-4 text-white bg-croonus-3 text-xs px-2 py-0.5 rounded">
                {wishListCount}
              </span>
            </div>
            {/* {wishListCount > 0 ? (
              <div ref={myRef} className="on-click-show-div-zero">
                <span
                  className="close-div-zero"
                  onClick={handleCloseClickWishlist}
                >
                  X
                </span>
                <b>Vaša lista želja je prazna.</b>
                Da biste videli sadržaj ove stranice, prvo morate dodati artikle
                u Vašu listu želja.
              </div>
            ): null} */}
            <span className="text-croonus-1 text-base font-light"> |</span>
            <div className="w-full relative">
              {cartCount > 0 ? (
                <Link href="/korpa">
                  <Image
                    src={Cart}
                    alt="wishlist"
                    width={30}
                    height={30}
                    className="cursor-pointer  hover:translate-y-0.5 transition-all ease"
                  />
                </Link>
              ) : (
                <>
                  <Image
                    src={Cart}
                    width={30}
                    height={30}
                    alt="Nimaco"
                    className="cursor-pointer   hover:translate-y-0.5 transition-all ease"
                    onClick={() =>
                      setMessage({
                        errorCart: !message?.errorCart,
                        messageCart: "Vaša korpa je prazna.",
                      })
                    }
                  />
                  {message.errorCart && (
                    <div className="absolute z-[1500]  bg-white w-96 p-1.5 rounded-xl 2xl:-left-80 3xl:-left-72 top-9">
                      <div className="border-2 rounded-xl p-3.5">
                        <span className="font-medium">
                          {message?.messageCart}
                        </span>
                        <p className="w-[80%] text-sm">
                          Da biste videli sadržaj ove stranice, prvo morate
                          dodati artikle u korpu.
                        </p>
                        <i
                          className="fa-solid fa-x absolute top-4 right-4 text-xs hover:text-red-500 cursor-pointer"
                          onClick={() =>
                            setMessage({
                              errorCart: !message?.errorCart,
                            })
                          }
                        ></i>
                      </div>
                    </div>
                  )}
                </>
              )}
              <span className="absolute -top-3 -right-4 text-white bg-croonus-3 text-xs px-2 py-0.5 rounded">
                {cartCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="bg-black bg-opacity-40 w-screen h-screen fixed top-0 left-0 z-50 duration-500 transition-all"
          onClick={() => setOpen(false)}
        ></div>
      )}
      {message.errorWishlist || message.errorCart ? (
        <div
          onClick={() => setMessage({ errorWishlist: false })}
          className="fixed top-0 left-0 bg-black bg-opacity-40 z-[500] h-screen w-screen"
        ></div>
      ) : null}
    </>
  );
};

export default Navigation;
