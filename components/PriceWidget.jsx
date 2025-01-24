import styles from "../styles/PriceWidget.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { RiArrowRightDownLine, RiArrowRightUpLine } from "react-icons/ri";
import Link from "next/link";

const headers = {
  "X-RapidAPI-Key": "965544b128msh602fdb4437bf366p1faec3jsnd3773b9075b7",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

function PriceWidget() {
  const [cryptos, setCryptos] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchCryptos = async () => {
      const { data } = await axios(
        `https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=5&offset=0`,
        {
          headers,
        }
      );

      setCryptos(data.data.coins);
      setIsFetched(true);
    };

    fetchCryptos();
  }, []);

  return (
    <div className={styles.priceWidget}>
      <div className={styles.priceWidgetHeader}>
        <h3>Kursy Live</h3>
      </div>
      {isFetched &&
        cryptos.map((crypto) => (
          <div className={styles.crypto} key={crypto.rank}>
            <div className={styles.cryptoImage}>
              <Image
                src={crypto.iconUrl}
                alt="crypto-logo"
                width="30px"
                height="30px"
              />
            </div>
            <div className={styles.cryptoInfo}>
              <h5>
                {crypto.name} ({crypto.symbol})
              </h5>
              <p>${isFetched && parseInt(crypto.price).toFixed(2)}</p>
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
        ))}
        <div className={styles.moreLink}>
        <Link href="/kurskryptowalut">
          <button className={styles.styledButton}>Zobacz więcej</button>
        </Link>
      </div>
    </div>
  );
}

export default PriceWidget;
