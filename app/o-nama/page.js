

export const metadata = {
  title: "O nama | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const AboutUs = () => {


  return (
    <div className="mx-auto 4xl:container">
      <div className="w-[90%] lg:w-[70%] mx-auto py-[2rem] md:py-[8rem] nmg">
        <div className="mt-[10rem]">
          <span className="text-xl font-bold">O kompaniji NI MACO</span>
        </div>
        <div className="mt-3">
          <span className="text-sm mb-1">
          Kompanija NI MACO iz Niša, osnovana 11. novembra 2002. godine, ima za cilj da domaćem tržištu obezbedi visokokvalitetan okov uz potpunu tehničku podršku. Naša posvećenost kvalitetu odražava se kroz pažljivo odabrane proizvode koje distribuiramo, počevši od proizvoda renomirane austrijske kompanije MACO, zatim sa kompanijama Fapim, ISO Chemie, Weiss Chemie i mnogi drugi. Zahvaljujući kontinuiranim naporima i posvećenosti, postigli smo značajne rezultate na tržištima Srbije i Crne Gore, čime smo utabali put za širenje našeg prodajnog asortimana. Da bi smo se još bolje povezali sa našim kupcima, odlučili smo otvoriti novo pravno lice u Beogradu 2010. godine pod nazivom BEO MACO.{" "}
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <span className="text-sm">
            {" "}
            Danas, kao ovlašćeni distributeri najvećih svetskih proizvođača okova i građevinskog repromaterijala, ponosno nudimo bogat asortiman proizvoda. Naš portfolio obuhvata različite tipove okova za drvenu, drvo-aluminijumsku (Drvo-Al), aluminijumsku (Alu), aluminijum-drvo (Al-Drvo) i PVC stolariju, čime zadovoljavamo širok spektar potreba naših klijenata.
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          <span className="text-sm">
          U kompaniji NI MACO smo posvećeni pružanju kontinuirane podrške našim klijentima u svakom segmentu – od snabdevanja preko tehničke podrške do asistencije prilikom ugradnje okova. Naša misija je da omogućimo besprekornu realizaciju projekata naših klijenata, obezbeđujući pri tom visok nivo profesionalizma i ekspertizu. Naše dugogodišnje iskustvo i stručnost čine nas pouzdanim partnerom u domenu građevinske stolarije.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
