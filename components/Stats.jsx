import styles from "../styles/Stats.module.scss";
import NumberFormat from "react-number-format";

function Stats({ stats }) {
  console.log(stats);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>
            <span>// </span>Aktualne statystki rynku kryptowalut
          </h2>
        </div>
        <div className={styles.statCards}>
          <div className={styles.statCard}>
            <h2>Kapitalizacja rynkowa</h2>
            <p>
              $
              {stats && (
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={stats?.data.total_market_cap.usd.toFixed(2)}
                  decimalSeparator="."
                  displayType="text"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={true}
                />
              )}
            </p>
          </div>
          <div className={styles.statCard}>
            <h2>Wolumen 24h</h2>
            <p>
              $
              {stats && (
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={stats.data.total_volume.usd.toFixed(2)}
                  decimalSeparator="."
                  displayType="text"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={true}
                />
              )}
            </p>
          </div>
          <div className={styles.statCard}>
            <h2>Kapitalizacja rynkowa BTC w %</h2>
            <p>{stats?.data.market_cap_percentage.btc.toFixed(2)}%</p>
          </div>
          <div className={styles.statCard}>
            <h2>Ilość kryptowalut</h2>
            <p>{stats?.data.active_cryptocurrencies}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
