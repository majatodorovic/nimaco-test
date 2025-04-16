import Layout from "../../components/UI/Layout";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
export const metadata = {
  title: "Reklamacije | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const Reclamations = () => {

  return (
    <div className="mx-auto 4xl:container">
      <div className="bg-croonus-3 py-4">
        <Layout>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-4">


              <span className="text-2xl font-bold text-croonus-2">Politika reklamacija </span>
            </div>
            <Breadcrumbs />
          </div>
        </Layout>
      </div>
      <Layout>
        <div className="mt-10 flex flex-col gap-4 mb-4">
          <span className="text-lg font-medium ">
          Uslovi za podnošenje zahteva i povraćaj robe:
          </span>
          <span className="text-sm">
            U skladu sa važećim Zakonom o zaštiti potrošača (Službeni glasnik
            Republike Srbije br. 62/2014 i 6/2016), molimo vas da budete
            informisani o sledećem:
          </span>
          <span className="text-sm">
            Kupac ima pravo da odustane od ugovora bez navođenja razloga u roku
            od 14 dana od datuma preuzimanja robe, osim ako naručena i primljena
            roba nije napravljena u skladu sa specifičnim zahtevima Kupca,
            prilagođena ili personalizovana .
          </span>
          <span className="text-sm">
            Kupac će imati pravo na ovo pravo slanjem popunjene Izjave o
            odustajanju od Ugovora na daljinu na e-mail adresu i vraćanjem robe
            na adresu Prodavca. Obrazac “Izjava o odustajanju od Ugovora na
            daljinu” Kupac je dužan da zatraži putem e-mail od Prodavca.
            Prodavac je dužan da Kupca bez odlaganja obavesti o prijemu ove
            Izjave.
          </span>
          <span className="text-sm">
            Kupac mora vratiti proizvod neiskorišćen, neoštećen i u neoštećenom
            originalnom pakovanju, uz obrazac „Izjava o odustajanju od ugovora
            na daljinu“.
          </span>
          <span className="text-sm">
            Troškove povrata robe snosi Kupac, osim u slučajevima kada primljeni
            proizvod ne odgovara onome što je Kupac naručio ili ako postoje
            nedostaci na robi za koje je Prodavac odgovoran.
          </span>
          <span className="text-sm">
            Prodavac zadržava pravo da ne prihvati vraćeni proizvod ako se tokom
            inspekcije utvrdi da ga je Kupac koristio ili oštetio.
          </span>
          <span className="text-sm">
            Po prihvatanju i pregledu vraćene robe, Prodavac je dužan da vrati
            sve uplate primljene od Kupca za kupovinu proizvoda.
          </span>
          <span className="text-sm">
            Pošaljite popunjeni obrazac „Izjava o odustajanju od ugovora na
            daljinu“ u elektronskom obliku na e-mail adresu prodavca:
            {process.env.EMAIL}
          </span>
          <span className="text-sm">
            Pošaljite jedan primerak popunjenog obrasca zajedno sa robom koja se
            vraća na adresu prodavca:
          </span>
          <ul>
          <li className="text-sm">{process.env.PERSON}</li>
            <li className="text-sm">{process.env.STREET}</li>
            <li className="text-sm">{process.env.CODE} {process.env.CITY}, {process.env.STATE}</li>
          </ul>
          <span className="text-sm">
            U slučaju vraćanja robe i povraćaja sredstava kupcu koji je
            prethodno platio nekom od platnih kartica, delimično ili u celosti,
            a bez obzira na razlog vraćanja, {process.env.PERSON} je u
            obavezi da povraćaj vrši isključivo preko VISA, EC/MC i Maestro
            metoda plaćanja, što znači da će banka na zahtev prodavca obaviti
            povraćaj sredstava na račun korisnika kartice.
          </span>
        </div>
      </Layout>
    </div>
  );
};

export default Reclamations;
