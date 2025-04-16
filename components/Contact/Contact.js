"use client";
import { useState, useEffect, useCallback } from "react";
import { get, post } from "@/app/api/api";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";


const Seo = dynamic(() => import("@/components/SEO/Seo"), {
  ssr: false,
  loading: () => null,
});
import { useSearchParams } from "next/navigation";


const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [error, setError] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const params = useSearchParams();
  const slug = params.get("slug");

  const apiKey = 'AIzaSyAb3yABiMy-kIRMSGFD1YQMMp8pMHPZ2m0';
  const [product, setProduct] = useState(null);

  const verifyCaptcha = useCallback((token) => {
    setToken(token);
  }, []);

const places = [
  {
  lat: 43.3176508,
  lng: 21.9187819},
  {
    lat: 43.9292004,
    lng: 20.411091},
    {
      lat: 44.8504035,
      lng: 20.3541834},
]

const center = {
  lat: 43.9292004,
  lng: 20.411091,
};

  const [formData, setFormData] = useState({
    page_section: "contact_page",
    customer_name: "",
    city: "",
    phone: "",
    email: "",
    mail_to: "",
    subject: "",
    company_sector: "",
    message: "",
    accept_rules: false,
    gcaptcha: token,
  });

  const [formFileds, setFormFields] = useState({});
  const [message, setMessage] = useState({ error: false, content: null });
  useEffect(() => {
    if (slug) {
      const getProduct = async (slug) => {
        const getProduct = await get(
          `/product-details/basic-data/${slug}`
        ).then((res) => {
          setProduct(res?.payload);
          setFormData({
            page_section: "contact_page",
            customer_name: "",
            city: "",
            phone: "",
            email: "",
            mail_to: "",
            subject: `Upit za proizvod ${product?.data?.item?.basic_data?.name}`,
            company_sector: "",
            message: `Poštovani, \n\nMolim Vas da na datu e-mail adresu pošaljete ponudu za proizvod ${product?.data?.item?.basic_data?.name}.\n\nHvala.`,
            accept_rules: false,
            gcaptcha: token,
          });
        });
      };
      getProduct(slug);
    } else return;
  }, [slug, product?.data?.item?.basic_data?.name]);
  const formChangeHandler = ({ target }) => {
    setMessage({ error: false, content: null });
    if (target.name === "company_sector") {
      const mail = formFileds?.company_sector?.ddl_options.filter(
        (item) => item.id === target.value
      )[0].mail_to;

      setFormData({ ...formData, company_sector: target.value, mail_to: mail });
    } else {
      setFormData({
        ...formData,
        [target.name]:
          target.type === "checkbox" ? target.checked : target.value,
      });
    }
  };

  useEffect(() => {
    get("/contact/contact_page")
      .then((response) => setFormFields(response?.payload))
      .catch((error) => console.warn(error));
  }, []);
  useEffect(() => {
    setFormData({ ...formData, gcaptcha: token });
  }, [token]);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (loading) return;
    setError(true);

    for (const item in formData) {
      if (
        formData[item] === "" &&
        formFileds[item]?.fields_rule?.includes("required")
      ) {
        setMessage({
          error: true,
          content: "Nisu popunjena sva obavezna polja!",
        });
        return;
      }
    }

    if (!formData.accept_rules) {
      setMessage({ error: true, content: "Morate prihvatiti uslove!" });
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setMessage({
        error: true,
        content: "Molimo unesite validnu e-mail adresu.",
      });
      return;
    }

    setLoading(true);
    setRefreshReCaptcha((r) => !r);

    post("contact/contact_page", formData)
      .then((response) => {
        if (response?.success !== true) {
          setError(true);
          setMessage({
            error: true,
            content: "Došlo je do greške, molimo Vas pokušajte ponovo.",
          });
          return;
        }

        setMessage({
          error: false,
          content: "Uspešno ste poslali poruku, uskoro ćemo Vas kontaktirati.",
        });

        setFormData({
          ...formData,
          page_section: "contact_page",
          customer_name: "",
          city: "",
          phone: "",
          email: "",
          mail_to: "",
          subject: "",
          company_sector: "",
          message: "",
          accept_rules: false,
          gcaptcha: token,
        });

        setLoading(false);
        setError(false);
      })
      .catch((error) => console.warn(error));
  };
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.CAPTCHAKEY}>
      <GoogleReCaptcha
        onVerify={verifyCaptcha}
        refreshReCaptcha={refreshReCaptcha}
      />
      <Seo
        title="Kontakt"
        description="Kontakt"
        ogtitle="Kontakt"
        ogdescription="Kontakt"
        ogurl={`${process.env.BASE_URL}Contact`}
      />
      <div className="mx-auto 4xl:container contactHolder">
      
        <div className="mx-auto grid grid-cols-6 gap-y-3 gap-x-3 mt-8">
          <div className="col-span-6 bg-white p-1 sm:col-span-3 py-14  2xl:px-20 px-8">
          <h1 className="text-[30px] mb-6">Kontakt</h1>
            <div className="contactFormHolder h-[100%]">
              {error ? (
                <>
                  <h3 className="text-xl mb-6">Pišite nam</h3>
                  <p>
                    Ukoliko imate bilo kakvih pitanja, slobodno nam se obratite.
                  </p>
                  <form onSubmit={(e) => onSubmitHandler(e)}>
                    <input
                      type="text"
                      value={formData.customer_name}
                      name="customer_name"
                      className="infoForm"
                      placeholder="Ime i prezime"
                      onChange={formChangeHandler}
                    />
                      <input
                      type="text"
                      value={formData.city}
                      name="city"
                      className="infoForm"
                      placeholder="Grad"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.email}
                      name="email"
                      className="infoForm"
                      placeholder="E-mail adresa"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.phone}
                      name="phone"
                      className="infoForm"
                      placeholder="Broj telefona"
                      onChange={formChangeHandler}
                    />
                    <input
                      type="text"
                      value={formData.subject}
                      name="subject"
                      className=" infoForm"
                      placeholder="Naslov poruke"
                      onChange={formChangeHandler}
                    />
                    <textarea
                      type="text"
                      value={formData.message}
                      name="message"
                      className="messageForm"
                      placeholder="Poruka"
                      rows={"5"}
                      onChange={formChangeHandler}
                    />
                    <div className="checkboxContainer">
                      <input
                        id="acceptance"
                        type="checkbox"
                        className=" checkbox"
                        name="accept_rules"
                        checked={formData.accept_rules}
                        onChange={formChangeHandler}
                      />
                      <label className="checkboxLabel" htmlFor="acceptance">
                        Upoznat sam i slažem se sa sadržajem disklejmera.
                        Sadržaj disklejmera možete pogledati na{" "}
                        <Link
                          href="/opsti-uslovi-koriscenja"
                          className="underline"
                        >
                          Pročitaj uslove
                        </Link>
                      </label>
                    </div>
                    {message.content && (
                      <p
                        className={
                          message.error ? "error-message" : "success-message"
                        }
                      >
                        {message.content}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="max-lg:-right-3 px-5 py-2 text-base bg-croonus-3 text-white flex ml-auto mt-[1rem]"
                      onClick={onSubmitHandler}
                    >
                      {" "}
                      {loading ? (
                        <img
                          src={"/icons/loading-buffering.gif"}
                          className="loaderImg"
                        />
                      ) : (
                        "Pošalji poruku"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="messHolder h-[100%]">
                  <img
                    src="/icons/successmessage.png"
                    alt={process.env.COMPANY}
                    className=" h-[60px] ml-auto mr-auto"
                  />
                  <p className="ml-auto mr-auto mt-6">
                    Uspešno ste poslali poruku! Uskoro ćemo Vas kontaktirati
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-6 bg-croonus-3 p-1 sm:col-span-3 py-14 2xl:px-20 px-8">
            <div className="grid grid-cols-5 gap-4">
              <div className="max-md:col-span-5 col-span-2">
                <div className="companyInfoHolder">
                  <h3 className="text-2xl mb-8">{process.env.NAME}</h3>
                  <div className="addressHolder">
                    <ul>
                      <li className="font-medium">Adrese</li>
                      <li className="text-sm"> Bulevar Dr Zorana Đinđića 121A, 18000 Niš</li>
                      <li className="text-sm">  Stojana Dečermića 15, 11080 Beograd</li>
                      <li className="text-sm">  Preljina bb, 32212</li>
                    </ul>
                  </div>
                  <div className="contactUsHolder mt-5">
                  </div>
                  <div className="socialNetworkHolder flex mt-[2rem]">
                    <div className="circleHolder">
                      <Link
                        href="https://www.instagram.com/office_nimaco"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-instagram hover:text-croonus-3" />
                      </Link>
                    </div>
                    <div className="circleHolder">
                      <Link
                        href="https://www.facebook.com/officenimaco"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fa-brands fa-facebook hover:text-croonus-3" />
                      </Link>
                    </div>
                    <div className="circleHolder">
                      <Link href="https://www.linkedin.com/company/office-nimaco/"
                      target="_blank"
                      rel="noopener noreferrer">
                      <i className="fa fa-linkedin  hover:text-croonus-3"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-md:col-span-5 col-span-3">
                <div className="relative h-[500px] max-lg:w-[320px] xl:h-[400px] 2xl:h-[500px] xl:w-full shadow-2xl">
                <LoadScript googleMapsApiKey={apiKey} className="border border-white">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '500px', border: '3px solid white' }}
        center={center}
        zoom={7}
        className="border border-white"
      >
     {places.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
    </LoadScript>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </GoogleReCaptchaProvider>
  );
};

export default ContactPage;
