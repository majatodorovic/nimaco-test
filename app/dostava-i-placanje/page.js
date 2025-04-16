import Layout from "../../components/UI/Layout";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
export const metadata = {
  title: "Dostava i plaćanje | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const Delivery = () => {

  return (
    <div className="mx-auto 4xl:container">
      <div className="bg-croonus-3 py-4">
        <Layout>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">
              {/*<div className="flex flex-row items-center gap-2">*/}
              {/*  <i className="text-lg fa-solid fa-chevron-left text-croonus-2 w-[10px]" />*/}
              {/*  <span*/}
              {/*    className="text-base text-croonus-2 cursor-pointer"*/}
              {/*    onClick={() => router.back()}*/}
              {/*  >*/}
              {/*    Nazad*/}
              {/*  </span>*/}
              {/*</div>*/}

              <span className="text-2xl font-bold text-croonus-2">Dostava i plaćanje </span>
            </div>
            <Breadcrumbs />
          </div>
        </Layout>
      </div>
      <Layout>
        <div className="mt-10 flex flex-col gap-4 mb-4">
        <span className="text-sm ">
            {process.env.NAME} proizvodi naručeni / kupljeni preko internet prodavnice
             {process.env.SITE} mogu se platiti putem platnih kartica, direktnom
            uplatom na račun, gotovinom kada se isporuče na adresu kupca
            (pouzećem) i PayPal-om.
          </span>
          <span className="text-sm ">
            Prodavac se obavezuje da će obavestiti
            kupca čim je naručeni / kupljeni proizvod napravljen i da će robu
            poslati u roku od 24 sata od datuma proizvodnje. Dostava se vrši
            putem PostExpress kurirske službe Pošte Srbije na celoj teritoriji
            Srbije, putem „Dostave sledećeg dana do 12 sati“. ili „Dostava
            narednog dana do 19:00“. Ako Kupac želi da mu se roba isporuči na
            drugi način (ličnim preuzimanjem ili upotrebom druge kurirske
            službe), neophodno je o tome obavestiti Prodavca putem e-maila.
          </span>
          <span className="text-lg font-medium">Troškovi isporuke:</span>
          <span className="text-sm ">
            U slučaju korišćenja usluga PostExpress-a ili druge kurirske službe,
            troškove isporuke na adresu snosi Kupac ukoliko je iznos porudžbine
            do 4900rsd. U slučaju da iznos porudžbine prelazi 4900rsd troškove
            dostave snosi Prodavac.
          </span>
          <span className="text-sm ">
            Kada se kupac odluči za plaćanje prilikom dostave, troškove isporuke
            naplaćivaće PostExpress (ili druge kurirske usluge) prema važećem
            cenovniku kurirske službe, a biće uvećani za naknadu za prenos
            pošiljke (cena naručenih proizvoda) i prenos novca na račun
            Prodavca.
          </span>
          <span className="text-sm ">
            Važeći PostExpress cenovnik Pošte Srbije pogledajte na sledećoj web
            adresi.
          </span>
          <span className="text-sm ">
            Od trenutka preuzimanja pošiljke od strane kurirske službe, punu
            odgovornost preuzima dostavna služba, a Prodavac će biti izuzet od
            odgovornosti u vezi sa eventualnim odloženim pošiljkama, vremenom
            isporuke pošiljke i oštećenjima pošiljki nastalim tokom transporta.
          </span>
          <span className="text-lg font-medium">Međunarodna špedicija:</span>
          <span className="text-sm ">
            Troškovi dostave zavise od zemlje odredišta i težine same pošiljke.
            Obračunavaju se prilikom porudžbine, kada Kupac odabere adresu
            dostave.
          </span>
          <span className="text-sm ">
            Otprema proizvoda u inostranstvo vrši se putem poštanske usluge za
            međunarodne pošiljke – PostExport Pošte Srbije. Dostava se vrši u
            roku od 10 radnih dana od datuma otpreme pošiljke za teritoriju
            Evrope ili 15-25 poslovnih dana za ostale delove sveta. Kupac će
            dobiti broj za praćenje, tako da svoju narudžbinu može „pratiti“
            bilo kada.
          </span>
          <span className="text-sm ">
            Prodavac nije odgovoran za bilo kakve naknade koje mogu nastati kao
            rezultat carinskih i poreskih propisa u zemlji odredišta. Molimo vas
            da pre naručivanja proverite carinske i poreske propise u zemlji u
            koju primate pošiljku.
          </span>
          <span className="text-sm ">
            Od trenutka preuzimanja pošiljke od strane kurirske službe, punu
            odgovornost preuzima dostavna služba, a Prodavac će biti izuzet od
            odgovornosti u vezi sa mogućim odloženim pošiljkama, vremenom
            isporuke pošiljke i oštećenjem pošiljki nastalih transport.
          </span>
        </div>
      </Layout>
    </div>
  );
};

export default Delivery;
