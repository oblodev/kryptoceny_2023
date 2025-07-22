import styles from "../styles/Stats.module.scss";
import { ImStatsBars } from "react-icons/im";
import { motion } from "framer-motion";

// Reusable, performant formatters defined outside the component
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact', // Formats large numbers like $1.2T
  maximumFractionDigits: 2
});

const numberFormatter = new Intl.NumberFormat('en-US');
const percentFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2
});

// A reusable Stat Card component for cleaner code
function StatCard({ label, value, formatter = 'number' }) {
  let formattedValue;

  switch (formatter) {
    case 'currency':
      formattedValue = currencyFormatter.format(value);
      break;
    case 'percent':
      // The API provides a whole number, so we divide by 100
      formattedValue = percentFormatter.format(value / 100);
      break;
    default:
      formattedValue = numberFormatter.format(value);
  }
  
  return (
    <div className={styles.statCard}>
      <h2>{label}</h2>
      <p>{formattedValue}</p>
    </div>
  );
}

function Stats({ stats }) {
  // Loading/Error State
  if (!stats?.data) {
    return (
      <section className={styles.container}>
        <div className={styles.header}>
          <ImStatsBars className={styles.icon} />
          <h2>Statystyki</h2>
        </div>
        <p className={styles.errorMessage}>Nie udało się załadować danych.</p>
      </section>
    );
  }

  const { total_market_cap, total_volume, market_cap_percentage, active_cryptocurrencies } = stats.data;

  return (
    <section className={styles.container} aria-labelledby="stats-heading">
      <motion.div
        className={styles.header}
        whileInView={{ y: [30, 0], opacity: [0, 1] }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ImStatsBars className={styles.icon} />
        <h2 id="stats-heading">Statystyki</h2>
      </motion.div>

      <motion.div
        className={styles.statGrid}
        whileInView={{ y: [30, 0], opacity: [0, 1] }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <StatCard label="Kapitalizacja rynkowa" value={total_market_cap?.usd} formatter="currency" />
        <StatCard label="Wolumen 24h" value={total_volume?.usd} formatter="currency" />
        <StatCard label="Dominacja BTC" value={market_cap_percentage?.btc} formatter="percent" />
        <StatCard label="Ilość kryptowalut" value={active_cryptocurrencies} />
      </motion.div>
    </section>
  );
}

export default Stats;