import { CartContextProvider } from "./api/cartContext";
import Script from "next/script";
import Navigation from "@/components/Navigation/Navigation";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import Footer from "@/components/Footer/Footer";
import TopBar from "@/components/TopBar/TopBar";
import { AppWrapper } from "../context/state";
import Analytics from "@/components/GoogleTagManager/GoogleTagManager";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "keen-slider/keen-slider.min.css";
import CookieAlert from "@/components/CookieAlert/CookieAlert";
import { QueryProvider } from "@/components/QueryProvider/QueryProvider";
import Newsletter from "@/components/Newsletter/Newsletter";
import { UserProvider } from "@/context/userContext";

export const metadata = {
  title: "Početna | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};

export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      <UserProvider>
        <AppWrapper>
          <CartContextProvider>
            <html lang="en">
              <head>
                <link
                  rel={`stylesheet`}
                  href={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css`}
                />

                <Script
                  src={`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/js/regular.js`}
                ></Script>
              </head>
              <body className="bg-white">
                <Analytics />
                <TopBar />
                <Navigation />
                <CookieAlert />
                <NavigationMobile />
                {children}
                <Newsletter />
                <Footer />
                {/* <Credits /> */}
              </body>
            </html>
          </CartContextProvider>
        </AppWrapper>
      </UserProvider>
    </QueryProvider>
  );
}
