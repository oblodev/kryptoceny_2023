import styles from "../styles/Kryptokursy.module.scss";

import { SymbolInfo } from "react-ts-tradingview-widgets";
import PriceTicker from "../components/PriceTicker";
import Head from "next/head";

function kryptokursy() {
  return (
    <>
      {" "}
      <Head>
        <title>
          KryptoCeny.pl | Kurs Kryptowalut - Aktualne Ceny i Wiadomości o Rynku
        </title>
        <meta
          name="description"
          content="KryptoCeny.pl | Śledź kursy kryptowalut oraz najnowsze informacje z rynku cyfrowych walut. Dowiedz się więcej o Bitcoinie, Ethereum, Dogecoin i innych."
        />
        <meta
          name="keywords"
          content="kursy kryptowalut, Bitcoin, Ethereum, rynek kryptowalut, blockchain, kurs Bitcoina"
        />
        <meta
          property="og:title"
          content="Kurs Kryptowalut - Aktualne Ceny i Wiadomości o Rynku"
        />
        <meta
          property="og:description"
          content="Zobacz aktualne kursy i wiadomości na temat kryptowalut, w tym Bitcoin, Ethereum, DOGE, Cardano i inne."
        />
        <meta property="og:image" content="/path/to/featured-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kryptoceny.pl/kryptokursy" />
      </Head>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Kurs kryptowalut</h1>
          <p>
            Handel kryptowalutami w przeciągu kilku ostatnich lat urósł do
            rozmiarów osobnej kategorii na rynku walutowym. Stało się to za
            sprawą pojawienia się w ubiegłej dekadzie prekursora wirtualnych
            walut – Bitcoina. Jego debiut, jako alternatywa dla monetarnego
            systemu walut fiat, rozpoczął cały ruch kryptowalut. Jednak nie
            samym Bitcoinem rynek kryptowalut żyje. W obecnej chwili istnieją
            setki kryptowalut określanych jako “altcoiny”. Najpopularniejsze z
            nich to: Ethereum, Ripple, Litecoin, Cardano, IOTA, EOS czy Binance
            Cash.
          </p>
          <h2>
            Kilka słów o zasadzie działania najpopularniejszych kryptowalut
          </h2>
          <p>
            Zanim przejdziemy do meritum, czyli do kursów kryptowalut,
            powinniśmy przyjrzeć się ogólnemu schematowi działania
            poszczególnych wirtualnych walut, aby lepiej zrozumieć mechanizmy
            nimi kierujące. Zacznijmy od Bitcoina, czyli najpopularniejszej
            kryptowalucie powstałej 3 stycznia 2009 roku. Waluta ta została
            stworzona przez osobę o pseudonimie Satoshi Nakamoto.
          </p>
          <p>
            Bitcoin, jak i również “altcoiny”, charakteryzują się używaniem
            zdecentralizowanej bazy danych rozprowadzonej pomiędzy węzłami sieci
            peer-to-peer do przechowywania transakcji oraz kryptografii w celu
            zapewnienia podstawowych funkcji bezpieczeństwa. Bitcoin działa na
            zasadzie łańcuchów bloków (blockchain), która to technologia służy
            do przechowywania oraz przesyłania informacji o transakcjach
            zawartych w Internecie. Informacje te zostają ułożone w postaci
            następujących po sobie bloków danych. Jeden blok zawiera informacje
            o określonej liczbie transakcji, następnie po jego nasyceniu tworzy
            się kolejny blok danych, a za nim kolejny i następny, tworząc pewien
            rodzaj łańcucha.
          </p>
          <p>
            Wszystko to oraz fakt, że transakcje kryptowalutowe są poza kontrolą
            banków czy rządów, sprawia, że Bitcoiny i jego alternatywy stały się
            bardzo popularnymi instrumentami na giełdach walutowych.
          </p>
          <div className={styles.widget}>
            <SymbolInfo
              colorTheme="dark"
              autosize
              symbol="BINANCE:BTCUSDT"
              alt="Aktualny kurs Bitcoina w stosunku do USD"
            ></SymbolInfo>
          </div>
          <h2>Dlaczego ceny kryptowalut są tak zmienne?</h2>
          <p>
            Rynek walut cyfrowych do najstabilniejszych nie należy. Dlatego
            inwestycje dokonywane w jego ramach opierają się w dużej mierze na
            spekulacjach. W różnego rodzaju zestawieniach, przedstawiających
            aktualne kursy kryptowalut, porządkuje się je na podstawie
            kapitulacji rynkowej, ponieważ jest to najważniejszy i bezpośredni
            czynnik kształtujący ich wielkość. Pamiętajmy jednak, że cena
            kryptowaluty nie wskazuje na jej realną wartość. Wartość rzeczywistą
            można ocenić, mnożąc ilość monet będących w obiegu przez aktualną
            cenę.
          </p>
          <p>
            Należy jednak podkreślić, że nie da się jej precyzyjnie wyliczyć,
            ponieważ w obiegu mogą krążyć „monety”, do których użytkownik nie ma
            już dostępu. Rynek kryptowalutowy różni się od tradycyjnego obiegu
            pieniężnego również tym, że handel walutami trwa tutaj
            nieprzerwanie, 24h na dobę, 7 dni w tygodniu. Nieprzerwana praca
            rynku kryptowalut, zawdzięczana jest technologii blokchain, o której
            pisaliśmy wcześniej.
          </p>
          <h2>Co kreuje zainteresowanie kryptowalutami?</h2>
          <p>
            Niestety nie da się jednoznacznie na to pytanie odpowiedzieć,
            ponieważ czynniki wpływające na aktualną cenę kryptowaluty są
            wielorakie i złożone. Kryptowaluty, w przeciwieństwie do zwykłych
            walut, nie są oparta na sile gospodarki danego państwa czy
            instytucji finansowej.
          </p>
          <p>
            Wartość walut cyfrowych zależy w głównej mierze od dwóch czynników:
            zainteresowania pod względem inwestycyjnym oraz ilością
            przeprowadzanych transakcji na rynku. Z racji, iż ilość większości
            kryptowalut ma nałożone ograniczenie przez twórców, (Bitcoin-21 mln,
            Ethereum-18 mln, Litecoin-84 mln) przy osiągnięciu maksymalnej
            podaży nie istnieje możliwość wystąpienia inflacji. Teoretycznie
            rzecz biorąc oba czynniki, które w największym stopniu wpływają na
            kształtowanie się kursu Bitcoina muszą ze sobą współistnieć.
          </p>
          <div></div>
          <h2>Co kształtuje kurs kryptowalut?</h2>
          <p>
            Zainteresowanie różnymi kryptowalutami kreowane jest przez media
            oraz różnego rodzaju instytucje. Największy wpływ na kształtowanie
            się opinii na temat kryptowalut mają instytucje oficjalne, czyli
            rządowe poszczególnych krajów (regulatorzy, banki centralne) lub
            ponadnarodowe. W przypadku pojawienia się informacji o zakazie
            stosowania kryptowalut w danym kraju, czy zamykaniu giełd lub
            utrudnianiu działalności w tzw. kopaniu i, waluty te będą traciły na
            wartości.
          </p>
          <p>
            Znane i cenione osoby publiczne mają także ogromny wpływ na
            zainteresowanie walutą cyfrową, co w konsekwencji prowadzi również
            do zawyżenie lub zaniżenia obecnego kursu. Ludzie pokładają w
            autorytetach zaufanie, sugerują się ich wypowiedziami. I nie chodzi
            tutaj tylko o wielkie inwestycje, lecz także o zwykłe wybory i
            decyzje.
          </p>
          <p>
            Najlepszym przykładem zachwiania rynku kryptowalut jest założyciel
            m.in SpaceX, PayPala czy Tesli, Elon Musk. Znany ze swojej
            ekstrawagancji filantrop, już niejednokrotnie zmieniał swoimi
            wypowiedziami kursy wielu kryptowalut w tym Bitcoina. Zainwestował
            on też w wirtualną walutę Dogecoin, która za jego sprawą oraz
            wiernej mu społeczności internetowej osiągnęła ogromny sukces.
          </p>
        </div>
        <PriceTicker />
      </div>
    </>
  );
}

export default kryptokursy;
