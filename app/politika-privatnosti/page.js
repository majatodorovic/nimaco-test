import Layout from "../../components/UI/Layout";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
export const metadata = {
  title: "Politika privatnosti | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const PrivacyPolicy = () => {

  return (
    <div className="mx-auto 4xl:container">
      
      <Layout>
      <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">Politika privatnosti</h1>
        <div className="mt-[4rem] flex flex-col gap-4 mb-4 max-md:w-[90%] w-[50%] mx-auto">
          <span className="text-base mb-4">
          Vaša privatnost je od suštinskog značaja za nas, i posvećeni smo očuvanju i zaštiti vaših ličnih podataka. Molimo vas da pažljivo pročitate sledeće informacije kako biste bolje razumeli kako prikupljamo, koristimo i štitimo vaše podatke.
          </span>
          <span className="text-lg font-medium">1. Prikupljanje informacija:</span>
          <span className="text-sm ">
          Prilikom posete našem veb-sajtu, možemo prikupljati određene lične informacije poput imena, adrese e-pošte i informacija o uređaju koji koristite. Ove informacije prikupljamo isključivo uz vaš pristanak.
          </span>
          <span className="text-lg font-medium">2. Upotreba informacija:</span>
          <span className="text-sm ">
          Prikupljene informacije koristimo kako bismo vam pružili bolje iskustvo prilikom posete našem veb-sajtu. Takođe, koristimo ih za personalizaciju sadržaja, slanje relevantnih obaveštenja i poboljšanje naših proizvoda i usluga.
          </span>
          <span className="text-lg font-medium">3. Deljenje informacija:</span>
          <span className="text-sm ">
          Vaše lične informacije nećemo deliti, prodavati ili iznajmljivati trećim stranama bez vašeg izričitog pristanka, osim u slučajevima kada je to neophodno radi pružanja usluga koje ste zatražili ili u skladu sa zakonskim obavezama.
          </span>
          <span className="text-lg font-medium">4. Sigurnost podataka:</span>
          <span className="text-sm ">
          Implementirali smo sigurnosne mere kako bismo osigurali da vaše lične informacije budu zaštićene od neovlašćenog pristupa, gubitka ili oštećenja. Vaši podaci se obrađuju šifrovano i koristimo najnovije tehnologije za očuvanje sigurnosti podataka.
          </span>
          <span className="text-lg font-medium">5. Prava korisnika:</span>
          <span className="text-sm ">
          Imate pravo da zatražite pristup, ispravku, brisanje ili prenos vaših ličnih podataka. Takođe, možete povući svoj pristanak za obradu podataka u bilo kom trenutku.
          </span>
          <span className="text-lg font-medium">6. Promene politike privatnosti:</span>
          <span className="text-sm ">
          Politika privatnosti može se ažurirati s vremena na vreme, a sve promene će biti objavljene na ovoj stranici. Preporučujemo vam redovno proveravanje kako biste bili informisani o eventualnim izmenama.</span>
          <span className="text-sm">
Ako imate dodatna pitanja ili želite dodatne informacije u vezi s Politikom privatnosti, slobodno nas kontaktirajte. Hvala vam na poverenju i saradnji!
          </span>
        </div>
      </Layout>
    </div>
  );
};

export default PrivacyPolicy;
