"use client";
import { useState } from "react";
import { post } from "@/app/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Translated from "../../context/state";
import { useForm } from "react-hook-form";


const Nl = () => {
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (terms === false) {
      toast.error("Morate prihvatiti uslove.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setLoading(true);
      post("/newsletter", {
        email: data.email,
      }).then((response) => {
        reset();
        toast.success(response?.payload?.message, {
          position: toast.POSITION.TOP_CENTER,
        });

        setLoading(false);
      });
    }
  };
  return (
    <>
      <div className="flex h-full w-full flex-col pl-12 text-sm max-lg:col-span-4 max-lg:hidden mt-[4rem]">
          <p className="text-xl font-medium uppercase text-center my-[2rem]">Newsletter</p>
          <div className="bg-[#f4f3ef] rounded-md px-[4rem] py-[2.4rem] items-center lg:w-[70%] mx-auto">
            <form
               className="flex w-full gap-[5rem] items-center"
              onSubmit={(e) => {
                e.preventDefault();
                post("/newsletter", { email }).then((res) => {
                  toast.success(res.payload.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
                setEmail("");
              }}
            >
             <p className="whitespace-nowrap uppercase font-semibold">Prijava na newsletter</p>
              <input
                type="email"
                name="email"
                id="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                className={
                 `rounded-md placeholder:text-xs focus:border-red-500 focus:ring-0 py-3 border-[#f4f3ef] max-lg:w-full max-lg:text-center w-full`
                  
                }
                placeholder="Unesite Vašu email adresu..."
              />
              
              <button
                 className=" rounded-md bg-[#044e7b] px-[2.4rem] py-3 text-sm text-white hover:bg-opacity-80 ml-auto whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  if (!email || !/\S+@\S+\.\S+/.test(email)) {
                    toast.error("Molimo Vas da unesete ispravnu email adresu", {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    post("/newsletter", { email }).then((res) => {
                      toast.success(res.payload.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    });
                    setEmail("");
                  }
                }}
              ><Translated Key="send"/></button>
            </form>
            {/* <div className="mx-5 flex md:h-2/3 py-[2rem] max-lg:my-[2rem] flex-col items-center justify-center gap-5 rounded-lg bg-white bg-opacity-50 px-3 backdrop-blur-sm md:hidden">
            <form
              className=" relative flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                post("/newsletter", { email }).then((res) => {
                  toast.success(res.payload.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                });
                setEmail("");
              }}
            >
              <label htmlFor="email" className="text-sm text-croonus-1">
                Uživajte u kupovini najnovijih proizvoda uz aktuelne popuste.
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                className="focus:ring-0 focus:border-none h-10 focus:outline-none border-none p-2 bg-white bg-opacity-65 text-xs placeholder:text-xs text-croonus-1 placeholder:text-croonus-1"
                placeholder="Unesite Vašu email adresu"
              />
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="absolute right-2 bottom-3 text-xl text-croonus-3 hover:text-croonus-1"
                onClick={(e) => {
                  e.preventDefault();
                  if (!email || !/\S+@\S+\.\S+/.test(email)) {
                    toast.error("Molimo Vas da unesete ispravnu email adresu", {
                      position: "top-center",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } else {
                    post("/newsletter", { email }).then((res) => {
                      toast.success(res.payload.message, {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                    });
                    setEmail("");
                  }
                }}
              />
            </form>
          </div> */}
            </div>
      </div>
       
         
     
   
      <ToastContainer />
      </>
  );
};

export default Nl;
