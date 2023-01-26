import { useState, useEffect } from "react";
import styles from "../styles/PriceTicker.module.scss";
import Image from "next/image";
import axios from "axios";

function PriceTicker() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
      )
      .then((response) => setCryptoData(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className={styles.ticker_wrap}>
        <div className={styles.ticker}>
          {cryptoData &&
            cryptoData.map((crypto) => (
              <div className={styles.ticker__item}>
                <div className={styles.wrap}>
                  <Image
                    src={crypto.image}
                    alt="crypto-logo"
                    width="24px"
                    height="24px"
                    style={{ marginRight: "8px" }}
                  />
                  <div className={styles.name}>{crypto.name}:</div>
                  <div
                    className={
                      crypto.price_change_percentage_1h_in_currency > 0
                        ? "green"
                        : "red"
                    }
                  >
                    {crypto?.current_price >= 1
                      ? crypto?.current_price?.toFixed(2)
                      : crypto?.current_price?.toFixed(4)}
                    $
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default PriceTicker;
