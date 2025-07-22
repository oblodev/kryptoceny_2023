import styles from "../styles/Heading.module.scss";

// Reusable formatters can be defined outside the component
const numberFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'decimal',
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('pl-PL', {
  style: 'percent',
  signDisplay: 'exceptZero', // Automatically adds '+' or '-'
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

function Heading({ stats }) {
  const marketCap = stats?.data?.total_market_cap?.usd;
  const marketCapChange = stats?.data?.market_cap_change_percentage_24h_usd;

  // Loading state
  if (marketCap === undefined || marketCapChange === undefined) {
    return (
      <header className={styles.container}>
        <p>Ładowanie danych rynkowych...</p>
      </header>
    );
  }

  // Use a simple class for color based on the value
  const changeStyle = marketCapChange >= 0 ? styles.positive : styles.negative;
  
  // Format values using the Intl API
  const formattedMarketCap = numberFormatter.format(marketCap / 1e12); // 1e12 is a trillion
  const formattedChange = percentFormatter.format(marketCapChange / 100); // Intl.NumberFormat expects a decimal (e.g., 0.05 for 5%)

  return (
    <header className={styles.container}>
      <p>
        Globalna kapitalizacja rynkowa wynosi dziś
        <strong className={styles.value}> ${formattedMarketCap} biliona</strong>,
        co stanowi zmianę o <span className={changeStyle}>{formattedChange}</span> w ciągu 24h.
      </p>
    </header>
  );
}

export default Heading;