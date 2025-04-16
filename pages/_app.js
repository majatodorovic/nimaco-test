import Footer from "@/components/Footer/Footer";
import Navigation from "@/components/Navigation/Navigation";
import { CartContextProvider } from "@/app/api/cartContext";
import "../styles/globals.css";
import NavigationMobile from "@/components/Navigation/NavigationMobile";
import { AppWrapper } from "@/context/state";
import { QueryProvider } from "@/components/QueryProvider/QueryProvider";

export default function App({ Component, pageProps }) {
  return (
    <QueryProvider >
    <AppWrapper>
      <CartContextProvider>
        <div className="mx-auto 4xl:container bg-[#f8f4f0]">
          {" "}
          <Navigation />
          <NavigationMobile />
          <Component {...pageProps} />
         
          <Footer />
        </div>
      </CartContextProvider>
    </AppWrapper>
    </QueryProvider>
  );
}
