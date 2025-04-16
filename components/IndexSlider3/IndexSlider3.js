"use client";
import { useState } from "react";
import { post } from "@/app/api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import classes from "./IndexSlider3.module.css";

const IndexSlider3 = () => {
  const [email, setEmail] = useState("");

  return (
    <div className=" relative w-full mb-[3rem]">
      <div className="relative flex flex-col">
        <div
          className={`${classes.banner1} relative hidden lg:flex lg:items-center lg:justify-center`}
        >
          <div className="mx-auto flex h-2/3 w-[40%] mt-[2rem] flex-col items-center justify-center gap-5 bg-white bg-opacity-50 px-7">
            <div className="relative  text-2xl text-center font-normal text-croonus-1">
              <span className={`${classes.border}  text-center`}>
                Budite u toku sa <br />
                <span className="font-bold">
                  najnovijim informacijama...
                </span>{" "}
              </span>
            </div>
            <form
              className=" relative flex flex-col gap-6 "
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
              <label
                htmlFor="email"
                className="text-sm text-croonus-1 mt-5 text-center"
              >
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
                className="focus:ring-0 focus:border-none h-10 focus:outline-none border-none px-4 py-6 bg-croonus-3 text-xs placeholder:text-xs text-white placeholder:text-white"
                placeholder="Unesite Vašu email adresu"
              />
              
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="absolute right-2 bottom-3 text-xl text-croonus-2 hover:cursor-pointer hover:text-croonus-1"
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
          </div>
        </div>
        <div
          className={`${classes.banner2} relative flex items-center justify-center text-center lg:hidden`}
        >
          <div className="mx-5 flex md:h-2/3 py-[2rem] max-lg:my-[2rem] flex-col items-center justify-center gap-5 rounded-lg bg-white bg-opacity-50 px-3 backdrop-blur-sm">
            <div className="text-2xl relative font-bold text-croonus-1">
              <span className={`${classes.border}  text-center`}>
                Budite u toku sa <br />
                <span className="font-bold">
                  najnovijim informacijama...
                </span>{" "}
              </span>
            </div>
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IndexSlider3;
