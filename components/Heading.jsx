import styles from "../styles/Heading.module.scss";
import BigNumber from "bignumber.js";

function Heading({ stats }) {
  console.log(stats);
  const number = stats.data.total_market_cap.usd;
  const formattedNumber = (number / 1e12).toFixed(2).slice(0, 4);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p>
            Globalna kapitalizacja rynkowa kryptowalut wynosi dzisiaj{" "}
            <span className={styles.infoNum}>{formattedNumber}</span> biliona
            dolarów, co stanowi zmianę o{" "}
            <span
              className={
                stats.data.market_cap_change_percentage_24h_usd > 0
                  ? styles.plus
                  : styles.minus
              }
            >
              {stats.data.market_cap_change_percentage_24h_usd.toFixed(1)}%
            </span>{" "}
            w ciągu ostatnich 24 godzin.
          </p>
        </div>
        <div className={styles.loserGainer}></div>
      </div>
    </div>
  );
}

export default Heading;
