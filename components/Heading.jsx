import styles from "../styles/Heading.module.scss";
import BigNumber from "bignumber.js";

function Heading({ stats }) {
  const TRILLION = 1e12; // Define a meaningful constant
  const marketCap = stats?.data?.total_market_cap?.usd || 0;
  const marketCapChange = stats?.data?.market_cap_change_percentage_24h_usd || 0;

  const formattedMarketCap = (marketCap / TRILLION).toFixed(2);
  const changeClass = marketCapChange > 0 ? styles.plus : styles.minus;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {marketCap ? (
          <div className={styles.info}>
            <p>
              Globalna kapitalizacja rynkowa kryptowalut wynosi dzisiaj{" "}
              <span className={styles.infoNum}>
                {formattedMarketCap.slice(0, 4)}
              </span>{" "}
              biliona dolarów, co stanowi zmianę o{" "}
              <span className={changeClass}>
                {marketCapChange.toFixed(1)}%
              </span>{" "}
              w ciągu ostatnich 24 godzin.
            </p>
          </div>
        ) : (
          <p>Ładowanie danych o rynku kryptowalut...</p>
        )}
        <div className={styles.loserGainer}></div>
      </div>
    </div>
  );
}

export default Heading;
