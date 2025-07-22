import styles from "../styles/Onas.module.scss";
import Image from "next/image";
import logo from "../public/images/KryptoCeny.png";
import PriceTicker from "../components/PriceTicker";
import { FaQuoteLeft } from "react-icons/fa";

function Onas() {
  return (
    <>
      <main className={styles.container}>
        {/* --- Hero Section --- */}
        <header className={styles.hero}>
          <h1>O nas</h1>
          <p className={styles.subtitle}>
            <strong>KryptoCeny.pl to najszybszy i najłatwiejszy sposób</strong> na sprawdzenie
            kursu Bitcoina oraz wielu innych “altcoinów”, takich jak: Ethereum,
            Litecoin czy Cardano.
          </p>
        </header>

        {/* --- Mission Statement Section --- */}
        <section className={styles.missionSection}>
          <FaQuoteLeft className={styles.quoteIcon} aria-hidden="true" />
          <blockquote>
            Naszym głównym celem jest szerzenie wiedzy na temat kryptowalut i
            technologii blockchain. Wierzymy, że dzięki temu, użytkownicy naszej
            strony internetowej będą mogli inwestować bez tracenia ani chwili z
            ich cennego czasu.
          </blockquote>
        </section>

        {/* --- "Why Us?" Section with Grid Layout --- */}
        <section className={styles.whyUsSection}>
          <div className={styles.textColumn}>
            <h2>Dlaczego KryptoCeny?</h2>
            <p>
              Rynkiem kryptowalut zajmujemy się od 2017 roku. Od zawsze
              stawialiśmy na prostotę i przejrzystość, ponieważ uważamy, że te
              dwie cechy są najważniejsze jeśli chodzi o wirtualne waluty oraz
              ich monitorowanie.
            </p>
          </div>
          <div className={styles.logoColumn}>
            <Image
              src={logo}
              alt="Logo KryptoCeny.pl"
              width={250}
              height={62}
              objectFit="contain"
            />
          </div>
        </section>
      </main>

      {/* Price Ticker can remain as a separator */}
      <PriceTicker />
    </>
  );
}

export default Onas;