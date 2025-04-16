"use client";
import { useState, useContext} from "react";
import { userContext } from "@/context/userContext";
import { post } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const ForgottenPassword = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(userContext);
  const [formData, setFormData] = useState({
    email: "",
    email1: "",
    password: "",
  });


  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword((prevShowLoginPassword) => !prevShowLoginPassword);
  };
  const [type, setType] = useState("password");

  const formChangeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const formSubmitHandler = () => {
    const err = [];
    if (err.length > 0) {
      setErrors(err);
      console.log(err);
    } else {
      const ret = {
        email: formData.email,
        password: formData.password,
      };
      post("/customers/sign-in/login", ret)
        .then((response) => {
          if (response?.code === 200) {
            setIsLoggedIn(true);
            sessionStorage.setItem("loggedIn", true);
            Cookies.set("customer_token", response.payload.customer_token, {
              expires: 365,
            });
            router.push("/customer-profil");
          } else {
            setErrors("Greška pri logovanju.");
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
          }
          if (response?.code === 500 || response?.code === 400) {
            setErrors(
              "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva."
            );
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
          }
        })
        .catch((error) => console.warn(error));
    }
  };

  const changePasswordHandler = () => {
    const err = [];
    if (err.length > 0) {
      setErrors(err);
      console.log(err);
    } else {
      const ret = {
        email: formData.email1,
      };
      post("/customers/sign-in/forgot-password", ret)
        .then((response) => {
          if (response?.code === 200) {
            toast.success(
              "Uspešno ste poslali zahtev. Očekujte mail sa daljim instrukcijama.",
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          } else {
            setErrors("Greška pri logovanju.");
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
          }
          if (response?.code === 500 || response?.code === 400) {
            setErrors(
              "Došlo je do nepoznate greške pri obrađivanju Vašeg zahteva."
            );
            toast.error(
              "Greška pri logovanju. Proverite da li ste uneli ispravne podatke.",
              {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
          }
        })
        .catch((error) => console.warn(error));
    }
  };

    ;

    return (
        <>
        <ToastContainer />
                      <div className={`
                        max-md:overflow-y-scroll  p-[40px] flex flex-col relative borderThin bg-[#f0f0f080] rounded-lg w-fit mx-auto mt-[3rem]`}
                      >
                        <h3 className="font-semibold text-xl underline">
                          ZABORAVILI STE LOZINKU?
                        </h3>
                        <p className="mb-[2rem] mt-[0.4rem] font-thin text-[#4b4b4b]">
                          Unesite e-mail adresu da biste poništili lozinku.
                        </p>
                        <form>
                          <input
                            name="email1"
                            type="email"
                            autoComplete="off"
                            placeholder="E-mail:"
                            value={formData.email1}
                            onChange={formChangeHandler}
                            className="lg:w-[24rem] rounded-lg bg-white border-0 py-[0.6rem] w-full"
                          />
                        </form>
                        <button
                          onClick={changePasswordHandler}
                          className="bg-croonus-3 rounded-lg text-white py-[0.7rem] px-[1.3rem] text-sm hover:bg-opacity-70 w-fit mt-[0.6rem] ml-auto"
                        >
                          RESETUJ LOZINKU
                        </button>
                       
                      </div>
                      </>
     
    )
}

export default ForgottenPassword;