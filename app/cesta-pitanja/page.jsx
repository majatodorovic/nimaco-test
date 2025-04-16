import Layout from "../../components/UI/Layout";

export const metadata = {
  title: "FAQ | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};

const QandA = () => {

  return (
    <div className="mx-auto 4xl:container">
 
      <Layout>
      <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">Najčešća pitanja</h1>
        <div className="mt-[4rem] max-md:w-[90%] w-[50%] mx-auto flex flex-col gap-4 mb-4">
          <span className="text-base mb-4">
          Ovde smo prikupili nekoliko često postavljanih pitanja kako bismo vam olakšali proces kupovine i pružili vam dodatne informacije o našim proizvodima i uslugama.
          </span>
          <span className="text-lg font-medium">Koji su načini plaćanja koje prihvatate?</span>
          <span className="text-sm ">
          Trenutno, jedini dostupan način plaćanja je pouzećem.
          </span>
          <span className="text-lg font-medium">Kako da pratim svoju narudžbinu?</span>
          <span className="text-sm ">
          Nakon obrade narudžbine, dobićete mejl kada roba bude poslata sa informacijama o isporuci i praćenju. Svoju robu možete pratiti preko sajta kurirske službe Bex. Ovo će vam omogućiti da pratite status svoje narudžbine u realnom vremenu.
          </span>
          <span className="text-lg font-medium">Koliko traje isporuka?</span>
          <span className="text-sm ">
          Vreme isporuke zavisi od lokacije dostave i izabrane opcije isporuke. Detalje o vremenima isporuke možete pronaći tokom procesa kupovine.
          </span>
          <span className="text-lg font-medium">Šta da radim ako primim oštećen proizvod?</span>
          <span className="text-sm ">
          U slučaju oštećenja, odmah nas obavestite. Naš tim za podršku će vam pružiti sve potrebne informacije o procesu reklamacije i zameni oštećenih proizvoda.
          </span>
          <span className="text-lg font-medium">Kako se prijaviti za novosti i promocije?</span>
          <span className="text-sm ">
          Prijavite se za naš newsletter kako biste bili informisani o najnovijim proizvodima, akcijama i posebnim ponudama. Registracija je jednostavna i možete je obaviti na našem veb-sajtu.
          </span>
          <span className="text-base font-medium mt-4">Ako imate dodatna pitanja koja nisu obuhvaćena ovde, slobodno nas kontaktirajte. Naš tim je tu da vam pruži dodatne informacije i podršku. Hvala vam što ste odabrali NI MACO!</span>
         
        </div>
      </Layout>
    </div>
  );
};

export default QandA;
