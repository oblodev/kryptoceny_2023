import styles from "../styles/Stats.module.scss";
import NumberFormat from "react-number-format";
import { ImStatsBars } from "react-icons/im";
import { motion } from "framer-motion";

function Stats({ stats }) {
  if (!stats || !stats.data) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <motion.div
            className={styles.header}
            whileInView={{ y: [40, 0], opacity: [0, 1] }}
            transition={{ duration: 0.75 }}
          >
            <ImStatsBars className={styles.icon} />
            <h2>Statystyki</h2>
          </motion.div>
          <p className={styles.errorMessage}>Nie udało się załadować danych.</p>
        </div>
      </div>
    );
  }

  const { total_market_cap, total_volume, market_cap_percentage, active_cryptocurrencies } = stats.data;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.header}
          whileInView={{ y: [40, 0], opacity: [0, 1] }}
          transition={{ duration: 0.75 }}
        >
          <ImStatsBars className={styles.icon} />
          <h2>Statystyki</h2>
        </motion.div>
        <div className={styles.statCards}>
          <div className={styles.statCard}>
            <h2>Kapitalizacja rynkowa</h2>
            <p>
              $
              <NumberFormat
                value={total_market_cap?.usd.toFixed(2)}
                displayType="text"
                thousandSeparator={true}
                decimalSeparator="."
              />
            </p>
          </div>
          <div className={styles.statCard}>
            <h2>Wolumen 24h</h2>
            <p>
              $
              <NumberFormat
                value={total_volume?.usd.toFixed(2)}
                displayType="text"
                thousandSeparator={true}
                decimalSeparator="."
              />
            </p>
          </div>
          <div className={styles.statCard}>
            <h2>Kapitalizacja rynkowa BTC w %</h2>
            <p>{market_cap_percentage?.btc.toFixed(2)}%</p>
          </div>
          <div className={styles.statCard}>
            <h2>Ilość kryptowalut</h2>
            <p>{active_cryptocurrencies}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
