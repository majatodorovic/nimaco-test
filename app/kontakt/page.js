import ContactPage from "@/components/Contact/Contact";
import {Suspense} from "react";
export const metadata = {
  title: "Kontakt | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const Contact = () => {
  return <Suspense>
    <ContactPage />
  </Suspense>;
};

export default Contact;
