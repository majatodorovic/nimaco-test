import Layout from "../../components/UI/Layout";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
export const metadata = {
  title: "Uslovi korišćenja | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const TermsConditions = () => {
  return (
    <div className="mx-auto 4xl:container">
      <Layout>
        <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">
          Uslovi Korišćenja
        </h1>
        <div className="mt-[4rem] max-md:w-[90%] w-[50%] mx-auto flex flex-col gap-4 mb-4">
          <span className="text-base mb-4">
            Molimo vas da pažljivo pročitate sledeće uslove pre nego što
            nastavite s korišćenjem našeg veb-sajta. Pristupanjem i korišćenjem
            našeg veb-sajta potvrđujete da ste pročitali, razumeli i prihvatili
            ove uslove.
          </span>
          <span className="text-lg font-medium">1. Pravila korišćenja</span>
          <span className="text-sm ">
            Korišćenje našeg veb-sajta podložno je sledećim pravilima i
            odredbama. Nemojte koristiti naš veb-sajt na način koji bi mogao
            narušiti zakone ili prava drugih korisnika.
          </span>
          <span className="text-lg font-medium">2. Intelektualna svojina</span>
          <span className="text-sm ">
            Sav materijal na ovom veb-sajtu, uključujući tekstove, slike,
            logotipe i druge multimedijske elemente, zaštićen je autorskim
            pravima i ostalim zakonima o intelektualnoj svojini. Bez prethodnog
            pismenog odobrenja, zabranjeno je kopiranje, distribucija ili
            reprodukcija ovih materijala.
          </span>
          <span className="text-lg font-medium">
            3. Linkovi ka drugim sajtovima
          </span>
          <span className="text-sm ">
            Naš veb-sajt može sadržavati linkove ka drugim sajtovima koji nisu
            pod našom kontrolom. Ne snosimo odgovornost za sadržaj ili politiku
            privatnosti tih sajtova i preporučujemo vam da pročitate uslove
            korišćenja svakog sajta koji posećujete.
          </span>
          <span className="text-lg font-medium">4. Sigurnost podataka</span>
          <span className="text-sm ">
            Vaša sigurnost nam je prioritet. Prenos osetljivih informacija putem
            našeg veb-sajta šifrovan je i osiguran. Ipak, ne možemo garantovati
            apsolutnu sigurnost podataka, pa koristite veb-sajt na sopstvenu
            odgovornost.
          </span>
          <span className="text-lg font-medium">5. Izmena uslova</span>
          <span className="text-sm ">
            Zadržavamo pravo da u bilo kom trenutku izmenimo ove Uslove
            korišćenja. Ažurirane informacije biće objavljene na ovoj stranici.
            Nastavak korišćenja veb-sajta smatraće se prihvatanjem promenjenih
            uslova.
          </span>
          <span className="text-sm ">
            Ako imate dodatna pitanja ili nedoumice u vezi s Uslovima
            korišćenja, slobodno nas kontaktirajte. Hvala vam na razumevanju i
            saradnji!
          </span>
        </div>
      </Layout>
    </div>
  );
};

export default TermsConditions;
