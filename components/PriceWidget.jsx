import styles from "../styles/PriceWidget.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { RiArrowRightDownLine, RiArrowRightUpLine } from "react-icons/ri";
import Link from "next/link";

// This can be a separate component, but for simplicity, it's here.
const Spinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>
);

const headers = {
  "X-RapidAPI-Key": "965544b128msh602fdb4437bf366p1faec3jsnd3773b9075b7", // Remember to use your actual API key
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

function PriceWidget() {
  // 1. State setup: 'cryptos' for data, 'loading' for UI state.
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      // No need to set loading to true here, as it's the default state.
      try {
        const { data } = await axios(
          `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=5&offset=0`,
          { headers }
        );
        setCryptos(data.data.coins);
      } catch (error) {
        console.error("Failed to fetch crypto prices:", error);
        // Optionally, set an error state here to show a message to the user.
      } finally {
        // This always runs, ensuring the spinner is hidden after the attempt.
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []); // Empty dependency array means this runs once on mount.

  return (
    <div className={styles.priceWidget}>
      <div className={styles.priceWidgetHeader}>
        <h3>Kursy Live</h3>
      </div>

      {/* 2. Conditional Rendering: Show spinner or content based on loading state. */}
      {loading ? (
        <Spinner />
      ) : (
        cryptos.map((crypto) => (
          <div className={styles.crypto} key={crypto.uuid}> {/* Use uuid for a truly unique key */}
            <div className={styles.cryptoImage}>
              <Image
                src={crypto.iconUrl}
                alt={`${crypto.name} logo`}
                width={30}
                height={30}
              />
            </div>
            <div className={styles.cryptoInfo}>
              <h5>
                {crypto.name} ({crypto.symbol})
              </h5>
              {/* No need for 'isFetched' check here anymore */}
              <p>${parseFloat(crypto.price).toFixed(2)}</p>
            </div>
            <div className={styles.cryptoChange}>
              <p>
                {crypto.change}%{" "}
                {crypto.change < 0 ? (
                  <RiArrowRightDownLine className={styles.red} />
                ) : (
                  <RiArrowRightUpLine className={styles.green} />
                )}
              </p>
            </div>
          </div>
        ))
      )}
      
      <div className={styles.moreLink}>
        <Link href="/kurskryptowalut">
          <button className={styles.styledButton}>Zobacz więcej</button>
        </Link>
      </div>
    </div>
  );
}

export default PriceWidget;