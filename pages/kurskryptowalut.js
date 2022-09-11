import styles from "../styles/kursy.module.scss";
import KursyKryptowalut from "../components/KursyKryptowalut";

export async function getStaticProps() {
  const result = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = await result.json();

  return {
    props: {
      cryptos: data,
    },
  };
}

function kursy(cryptos) {
  return (
    <div className={styles.container}>
      <KursyKryptowalut cryptoData={cryptos} />
    </div>
  );
}

export default kursy;
