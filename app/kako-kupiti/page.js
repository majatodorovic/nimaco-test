import Image from "next/image";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
import Step1 from "../../assets/Images/1.png";
import Step2 from "../../assets/Images/2.png";
import Step3 from "../../assets/Images/3.png";
import Step4 from "../../assets/Images/4.png";

export const metadata = {
  title: "Kako kupiti | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const HowToBuy = () => {
  return (
    <div className="mx-auto 4xl:container pb-5">
      <div className="mx-auto mt-10 flex  max-md:w-[95%] md:w-[70%] flex-col gap-6 max-lg:text-center">
        <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">Kako kupiti</h1>
        <p className="mt-10 text-sm text-croonus-1">
          U gornjem delu (1) naše stranice nalazi se asortiman sa spiskom
          proizvoda koje možete kupiti na našem shopu. Proizvodi su grupisani u
          više kategorija ( sistemi za montažu građevinske stolarije, građevinska hemija, paneli i ispune za vrata... ), dok
          je svaka kategorija podeljena na više potkategorija (pene, profilni sistemi za montažu stolarije, zaptivne mase i lepkovi...). Kada kliknete na neku od potkategorija dobijate
          uvid u njihov sadržaj i na taj način tražite željeni proizvod. Ukoliko
          za određeni proizvod imate šifru artikla, uvek možete iskoristiti
          polje za pretragu (2) koje se nalazi u gornjem desnom uglu.
        </p>
        <Image
          src={Step1}
          alt=""
          className="max-h-[250px] max-w-[666px] object-scale-down shadow-xl max-lg:max-w-[380px]"
        />
        <p className="text-sm text-croonus-1">
          Kada pronađete proizvod koji želite da naručite, kliknite na njegovu
          sliku ili naziv proizvoda, gde će Vam izaći detaljne informacije (3) o
          proizvodu koji Vas zanima. Ukoliko je to proizvod koji želite da
          poručite – kliknite na dugme
          DODAJ U KORPU (4).
        </p>
        <Image
          src={Step2}
          alt=""
          className="max-h-[518px] max-w-[666px] object-scale-down shadow-xl max-lg:max-w-[380px]"
        />
        <p className="text-sm text-croonus-1">
          Kada dodate proizvode u korpu otvara Vam se brzi pregled korpe sa
          desne strane (5) gde imate uvid u proizvode koje ste naručili. Ukoliko
          želite da završite kupovinu i naručite izabrane proizvode kliknite na
          ZAVRŠI KUPOVINU (6), ukoliko želite da dodate još artikala, kliknite u
          brzoj korpi na X u gornjem levom uglu.
        </p>
        <Image
          src={Step3}
          alt=""
          className="max-h-[393px] max-w-[666px] object-scale-down shadow-xl max-lg:max-w-[380px]"
        />
      
        <p className="text-sm text-croonus-1">
          Klikom na dugme ZAVRŠI KUPOVINU otvara se stranica sa
          poljima za unošenje Vaših podataka (7) kako biste završili Vašu
          narudžbinu. Izaberete način plaćanja i dostave (8), pa kada ste se uverili da su informacije ispravne, kliknite na dugme POTVRDI PORUDŽBENICU (9) i time ste završili Vaš proces
          naručivanja na našem shopu.
        </p>
        
        <Image
          src={Step4}
          className="max-h-[393px] max-w-[666px] object-scale-down shadow-xl max-lg:max-w-[380px]"
          alt=""
        />
       
      </div>
    </div>
  );
};

export default HowToBuy;
