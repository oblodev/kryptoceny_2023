import styles from "../styles/Onas.module.scss";
import Image from "next/image";
import logo from "../public/images/KryptoCeny.png";
import PriceTicker from "../components/PriceTicker";

function onas() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.onasWrapper}>
          <div className={styles.header}>
            <h1>O nas</h1>
          </div>
          <div className={styles.info}>
            <p>
              KryptoCeny.pl to najszybszy i zarazem najłatwiejszy sposób na
              sprawdzenie kursu Bitcoina oraz wielu innych “altcoinów”, takich
              jak: Ethereum, Litecoin czy Cardano. Serwis zajmuje się
              monitorowaniem kryptowalut 24 godziny na dobę, siedem dni w
              tygodniu.
            </p>
            <p>
              “Naszym głównym celem jest szerzenie wiedzy na temat kryptowalut i
              technologii blockchain. Uważamy, że każdy początkujący inwestor na
              rynku wirtualnych walut, powinien być zaznajomiony z pojęciami go
              dotyczącymi. Dlatego też, na naszej stronie internetowej
              znajdziecie różne przydatne artykuły, które w prosty sposób
              wyjaśniają wszystkie najważniejsze kwestie odnośnie nie tylko
              samych kryptowalut, ale także sposobu ich działania (wspomniana
              wyżej technologia blockchain). Mamy nadzieję, że to wszystko co
              dla Was przygotowaliśmy, pomoże Wam w rozsądnych i zyskownych
              inwestycjach.”
            </p>

            <h2>Dlaczego KryptoCeny?</h2>
            <p>
              Rynkiem kryptowalut zajmujemy się od 2017 roku. Od zawsze
              stawialiśmy na prostotę i przejrzystość, ponieważ uważamy, że te
              dwie cechy są najważniejsze jeśli chodzi o wirtualne waluty oraz
              ich monitorowanie. Wierzymy, że dzięki temu, użytkownicy naszej
              strony internetowej będą mogli inwestować bez tracenia ani chwili
              z ich cennego czasu.
            </p>
            <div className={styles.logo}>
              <Image src={logo} />
            </div>
          </div>
        </div>
      </div>
      <PriceTicker />
    </div>
  );
}

export default onas;
