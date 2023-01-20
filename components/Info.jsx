import styles from "../styles/Info.module.scss";
import Link from "next/link";
import { AiOutlineLineChart } from "react-icons/ai";

function Info() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.infoWrap}>
          <div className={styles.header}>
            <AiOutlineLineChart className={styles.icon} />
            <h2>Kursy Kryptowalut</h2>
          </div>

          <p>
            KryptoCeny.pl to najszybszy i zarazem najłatwiejszy sposób na
            sprawdzenie kursu, niezależnie od tego, czy chodzi nam o Bitcoina
            czy jednego z wielu dostępnych altcoinów.
          </p>
          <p>
            Handel kryptowalutami w przeciągu kilku ostatnich lat urósł do
            rozmiarów osobnej kategorii na rynku walutowym. Stało się to za
            sprawą pojawienia się w ubiegłej dekadzie prekursora kryptowalut –
            Bitcoina. Jego debiut, jako alternatywa dla monetarnego systemu
            walut FIAT, rozpoczął cały ruch kryptowalut.
          </p>
          <p>
            Jednak nie samym Bitcoinem rynek kryptowalut żyje. W obecnej chwili
            istnieją tysięcy kryptowalut określanych jako “altcoiny”.
            Najpopularniejsze z nich to: Ethereum, Ripple, Litecoin, Cardano,
            IOTA, EOS czy Binance Coin.
          </p>
        </div>
        <div className={styles.infoWrap}>
          <h2>Po co sprawdzać kursy kryptowalut?</h2>
          <p>
            Otóż daje nam to pogląd na obecną sytuację danej kryptowaluty i
            pomaga zdecydować o ewentualnym wykonaniem operacji finansowej.
            Wiedza po jakim kursie chodzi dana waluta jest absolutnie konieczna
            i bez niej, nie mamy szans na jakiekolwiek zyski, gdyż nie będziemy
            wiedzieć ile pieniędzy będziemy potrzebować, aby zakupić wybraną
            przez nas kryptowalutę.
          </p>
        </div>
        <div className={styles.infoWrap}>
          <h2>Co kształtuje kurs kryptowaluty?</h2>
          <p>
            Niestety nie da się jednoznacznie na to pytanie odpowiedzieć,
            ponieważ czynniki wpływające na aktualną cenę kryptowaluty są
            wielorakie i złożone. Kryptowaluty, w przeciwieństwie do zwykłych
            walut, nie są oparte na sile gospodarki danego państwa czy
            instytucji finansowej. Wartość kryptowalut zależy w głównej mierze
            od dwóch czynników: zainteresowania pod względem inwestycyjnym oraz
            ilością przeprowadzanych transakcji na rynku.
          </p>
          <p>
            Z racji, iż ilość większości kryptowalut ma nałożone ograniczenie
            przez twórców, (Bitcoin-21 mln, Ethereum-18 mln, Litecoin-84 mln)
            przy osiągnięciu maksymalnej podaży nie istnieje możliwość
            wystąpienia inflacji. Teoretycznie rzecz biorąc oba czynniki, które
            w największym stopniu wpływają na kształtowanie się kursu Bitcoina
            muszą ze sobą współistnieć.
          </p>
          <p>
            Więcej informacji znajdziesz tutaj{" "}
            <Link href="/kryptokursy">
              <span className={styles.kryptoLink}>
                Kursy kryptowalut – wszystkie najważniejsze informacje
              </span>
            </Link>
            .
          </p>
        </div>
        <p className={styles.nota}>
          *Nota ostrzegawcza: Witryna KryptoCeny.pl nie jest poradnikiem
          inwestycyjnych w rozumieniu Rozporządzenia Ministra Finansów z dnia 19
          października 2005 r. w sprawie informacji stanowiących rekomendacji
          dotyczących instrumentów finansowych lub ich emitentów. Treści
          prezentowane na stronie są subiektywnym wyrazem poglądów autorów i nie
          powinny być traktowane jako porada inwestycyjna. Pamiętaj, że
          inwestycja w kryptowaluty może wiązać się z dużą stratą, a nawet
          utratą całego kapitału. Podejmuj mądre decyzje i inwestuj jedynie
          tyle, na ile możesz sobie pozwolić. Inwestycje w instrumenty rynku
          OTC, w tym kontrakty na różnice kursowe (CFD), ze względu na
          wykorzystywanie mechanizmu dźwigni finansowej wiążą się z możliwością
          poniesienia strat nawet przy niewielkiej zmianie ceny instrumentu
          bazowego, na podstawie którego jest oparte kwotowanie cen danego
          Instrumentu. Osiągnięcie zysku na transakcjach na instrumentach OTC, w
          tym kontraktach na różnice kursowe (CFD) bez wystawienia się na ryzyko
          poniesienia straty, nie jest możliwe. Podejmując decyzje inwestycyjne,
          Klient powinien kierować się własnym osądem.
        </p>
      </div>
    </div>
  );
}

export default Info;
