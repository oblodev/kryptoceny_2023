import styles from "../styles/kursy.module.scss";
import KursyKryptowalut from "../components/KursyKryptowalut";
import PriceTicker from "../components/PriceTicker";

function kursy({ cryptoData }) {
  return (
    <div className={styles.container}>
      <KursyKryptowalut cryptoData={cryptoData} />
      <PriceTicker />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = await res.json();

  return {
    props: {
      cryptoData: data,
    },
  };
}

export default kursy;
