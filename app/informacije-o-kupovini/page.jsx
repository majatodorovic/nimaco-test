import Layout from "../../components/UI/Layout";
import Breadcrumbs from "../../helpers/generateBreadCrumbsServer";
export const metadata = {
  title: "Informacije o kupovini | Nimaco",
  description: "Dobrodošli na online prodavnicu Nimaco.",
};
const Informations = () => {

  return (
    <div className="mx-auto 4xl:container">
      <Layout>

      <h1 className="mt-10 mb-6 text-center text-4xl font-bold uppercase">Informacije o kupovini</h1>

        <div className="mt-[4rem] flex flex-col gap-4 mb-4 text-justify max-md:w-[90%] w-[50%] mx-auto">
        <span className="text-sm ">
        Naša želja je pružiti vam jasne smernice kako biste imali bezbrižno iskustvo tokom procesa kupovine.
          </span>
          <span className="text-lg font-medium mt-4 mb-2">Način plaćanja</span>
          <span className="text-sm ">
          Trenutno, jedini dostupan način plaćanja je pouzećem. To znači da plaćanje vršite prilikom preuzimanja poručenih proizvoda. Ovaj način plaćanja pruža vam dodatnu sigurnost i praktičnost.
          </span>
          <span className="text-lg font-medium">Način isporuke</span>
          <span className="text-sm ">
          Sarađujemo s Bex kurirskom službom kako bismo vam omogućili brzu i sigurnu isporuku proizvoda. Troškovi isporuke snose se od strane kupca i zavise od izabrane opcije i lokacije dostave. Detalje o dostupnim opcijama i troškovima isporuke možete pronaći tokom procesa kupovine.
          </span>
          <span className="text-lg font-medium">Reklamacije</span>
            <span
                className="text-sm ">

Reklamacije se prihvataju u  prvih 7 dana od datuma isporuke proizvoda. Molimo vas da odmah obavestite naš tim za podršku o bilo kakvim nedoumicama ili oštećenjima kako bismo brzo rešili situaciju.
<br/><br/>
Ukoliko primetite prilikom prijema robe bilo kakvo oštećenje na pakovanju dužni ste da fotografišete paket koji ste primili i napravite zapisnik o oštećenju pošiljke sa kurirom koji Vam je dostavio pošiljku. Primerak zapisnika fotografišete, a fotografiju šaljete na email adresu <a
                href={`mailto:reklamacijeb2c@nimaco.rs`}>reklamacijeb2c@nimaco.rs</a> sa opisom problema u telu emaila.
U slučaju odustanka od ugovora potrošač ima pravo na povraćaj novca ili na zamenu za drugi proizvod. Iznos plaćene robe kupcu se vraća po prijemu proizvoda koji vraća zbog odustanka od ugovora, pod uslovom da se utvrdi da je proizvod neoštećen, tj. ispravan.
Trgovac je dužan da potrošaču bez odlaganja vrati iznos koji je potrošač platio po osnovu ugovora, a najkasnije u roku od 14 dana od dana prijema izjave o odustanku, odnosno od prijema proizvoda koji kupac vraća zbog odustanka od ugovora.
Troškove vraćanja robe snosi kupac, osim u slučajevima kada je kupac dobio neispravan ili pogrešan artikal.
 <br/><br/>
Procedura za povraćaj sredstava<br/><br/>
Da bi se izvršio povraćaj novčanih sredstava potrebni su nam sledeći podaci:<br/>
	•	Vaši lični podaci;<br/>
	•	Broj fiskalnog računa (račun ste dobili uz kupljeni proizvod);<br/>
	•	Broj dinarskog tekućeg računa, na koji će biti uplaćena novčana sredstva (u slučaju da je plaćanje izvršeno pouzećem)<br/>
	•	Broj lične karte<br/><br/>
Tražene podatke možete nam dostaviti emailom <a
                href={`mailto:reklamacijeb2c@nimaco.rs`}>reklamacijeb2c@nimaco.rs</a> <br/>Povraćaj sredstava se vrši isključivo uplatom na dinarski tekući račun kada je plaćanje izvršeno pouzećem.
Ukoliko ne možete poslati zahtev za povraćaj novčanih sredstava putem emaila, možete nas kontaktirati preko telefona 011 4122949. Takođe, ako imate dodatna pitanja, uvek nas možete kontaktirati preko istog broja telefona.
<br/><br/>
VAŽNA NAPOMENA: Molimo Vas da obratite pažnju na razliku izmedju ZAMENE i REKLAMACIJE. Ukoliko ste nakon prijema artikla utvrdili da Vam artikal iz bilo kog razloga ne odgovara, tada postupite po uputstvu za zamenu artikla.

<br/><br/>
Pravilnik o postupku i načinu rešavanja reklamacije robe kupljene putem sajta:
Član 1.
<br/><br/>
Ovim pravilnikom trgovac uređuje način, uslove i postupak rešavanja reklamacije ili prigovora potrošača zbog nesaobraznosti ugovoru, robe kupljene putem sajta nimaco.rs, kao i ovlašćenja, obaveze i odgovornosti trgovca u pogledu ostvarivanja prava potrošača na reklamaciju.
<br/><br/>
Član 2.
<br/><br/>
Potrošač je fizičko lice koje na tržištu pribavlja robu ili usluge u svrhe koje nisu namenjene njegovoj poslovnoj ili drugoj komercijalnoj delatnosti.
<br/><br/>
Član 3.
<br/><br/>
Zbog nesaobraznosti robe i usluge ugovoru, postoji zakonska odgovornost.
<br/><br/>
Član 4.
<br/><br/>
Potrošač ima pravo reklamacije na kupljeni proizvod u roku od dve godine od dana kupovine.
<br/><br/>
Član 5.
<br/><br/>
U slučaju da se ustanovi nesaobraznost robe ugovoru, ista roba se može ponuditi kupcu i prodati po posebnim uslovima.
Kupac će dobiti odredjeni popust za ovu robu.
Na računu u napomeni će pisati da roba nije saobrazna ugovoru.
Za ovu robu, potrošač ima pravo reklamacije u roku od godinu dana od dana kupovine, za oštećenje koje mu trgovac pre prodaje nije ukazao.
<br/><br/>
Član 6.
<br/><br/>
Zahtev za reklamaciju može se dostaviti poštom na adresu direkcije BEO MACO DOO BEOGRAD., Stojana Decermica 15, 11000 Beograd-Zemun, sa naznakom: REKLAMACIJA.
<br/><br/>
Troškove dostave snosi kupac.
<br/><br/>
Prilikom podnošenja zahteva za reklamaciju potrošač je dužan da:<br/>
a. Reklamirani artikal dostavi zajedno sa dokazom o kupovini – računom.<br/>
b. Dostavi popunjen reklamacioni list,<br/>
c. U reklamacionom listu potrebno je navesti razlog za reklamiranje robe i željeni način rešavanja.<br/>
<br/><br/>
Član 7.
<br/><br/>
Osnovanost zahteva za reklamaciju utvrđuje nadležna komisija.
Odgovor na izjavljenu reklamaciju potrošaču će biti poslat u najkraćem mogućem roku, a najkasnije u roku od 8 dana od dana prijema reklamacije. Rok za rešavanje reklamacije ne može biti duži od 15 dana, odnosno 30 dana za tehničku robu, od dana podnošenja reklamacije.
<br/><br/>
Prema Zakonu o zaštiti potrošača, rok za rešavanje reklamacije prekida se kada potrošač primi odgovor prodavca, a tu se misli na odgovor koji se daje u roku od 8 dana, i počinje da teče iznova kada prodavac primi izjašnjenje potrošača. Potrošač je dužan da se izjasni na odgovor prodavca najkasnije u roku od tri dana od dana prijema odgovora prodavca. Ukoliko se potrošač u propisanom roku ne izjasni, smatraće se da nije saglasan sa predlogom prodavca o načinu rešavanja reklamacije.
<br/><br/>
Član 8.
<br/><br/>
U slučaju osnovanosti reklamacije i prihvatanja iste od strane trgovca, potrošač ima pravo, po sopstvenom izboru, na:
a. Zamenu reklamirane robe, za novu robu saobraznu ugovoru, ili otklanjanje nedostatka na robi (ukoliko je to moguće).
b. Povraćaj novčanih sredstava prema priloženom računu. Povraćaj novčanih sredstava potrošaču, izvršiće se elektronskim putem na tekući račun potrošača, u roku od 15 dana od dana rešavanja reklamacije.
<br/><br/>
Član 9.
<br/><br/>
Vansudsko rešavanje potrošačkih sporova.
Potrošački spor može se rešiti postupkom vansudskog rešavanja potrošačkih sporova. Kao trgovac smo dužni da vas obavestimo da smo po zakonu obavezni da učestvujemo u ovom postupku. Vansudsko rešavanje potrošačkih sporova obalja se na transparentan, efikasan, brz i pravičan način pred telom za vansudsko rešavanje potrošačkih sporova.
Ministarstvo sačinjava listu tela i javno je objavljuje. Dostupna je na adresi Ministarstva trgovine, turizma i telekomunikacija https://vansudsko.mtt.gov.rs/adrbodies
<br/><br/>
Postupak pred telom može da pokrene potrošač samo ukoliko je prethodno izjavio reklamaciju ili prigovor trgovcu. Potrošač protekom jedne godine od dana (bezuspešnog) podnošenja reklamacije gubi pravo na podnošenje predloga za vansudsko rešavanje spora.
Vansudsko rešavanje potrošačkog spora može da traje najduže 90 dana od dana podnošenja predloga.
<br/><br/>
Vansudsko rešavanje potrošačkih sporova, ne primenjuje se, pored ostalog:
- u potrošačkim sporovima koji su predmet Zakona o zaštiti potrošača, ako je vansudsko rešavanje sporova uređeno posebnim zakonom, a naročito u oblasi pružanja elektronskih komunikacionih usluga, poštanskih usluga, finansijskih usluga, osom finansijskih pogodbi, usluga putovanja;
- za rešavanje sporova po procedurama koje je ustanovio sam trgovac;
- na neposredne pregovore između potošača i trgovca;
- na pokušaj mirenja strana povodom spora u parničnom postupku;
- u potupcima koje je trgovac pokrenuo protiv potrošača.
<br/><br/>
Svaka stranka u postupku vansudskog rešavanja potrošačkog spora plaća svoje troškove (troškove zastupanja, putni troškovi i sl.). Rad tela za vansudsko rešavanje potrošačkog spora je besplatan za stranke u postupku vansudskog rešavanja potrošačkog spora.


          </span>

            <span className={`text-lg font-medium`}>Reklamacioni list preuzmite <a className={`text-red-500`} href={`/reklamacije.pdf`} download>OVDE</a></span>

          <span className="text-sm ">
          Hvala vam što birate NI MACO. Ako imate dodatna pitanja ili želite dodatne informacije, slobodno nas kontaktirajte. Vaša sigurnost i zadovoljstvo su naš prioritet.
          </span>

        </div>
      </Layout>
    </div>
  );
};

export default Informations;
