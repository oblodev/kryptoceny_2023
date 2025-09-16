import styles from "../styles/kursy.module.scss";
import KursyKryptowalut from "../components/KursyKryptowalut";
import PriceTicker from "../components/PriceTicker";

function kursy({ cryptoData, isRateLimited }) {
  return (
    <div className={styles.container}>
      <KursyKryptowalut cryptoData={cryptoData} isRateLimited={isRateLimited} />
      <PriceTicker />
    </div>
  );
}

export async function getStaticProps() {
  const query = "vs_currency=usd&order=market_cap_desc&per_page=250&price_change_percentage=1h%2C24h%2C7d";

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${query}&page=1`);
    const rateLimitHit = response.status === 429;

    if (!response.ok) {
      try {
        const errorPayload = await response.json();
        console.error('CoinGecko error payload', errorPayload);
      } catch (error) {
        console.error('CoinGecko response error', error);
      }

      return {
        props: {
          cryptoData: [],
          isRateLimited: rateLimitHit,
        },
        revalidate: 300,
      };
    }

    try {
      const payload = await response.json();
      const coins = Array.isArray(payload) ? payload : [];

      return {
        props: {
          cryptoData: coins,
          isRateLimited: rateLimitHit,
        },
        revalidate: 300,
      };
    } catch (error) {
      console.error('CoinGecko JSON parse error', error);
      return {
        props: {
          cryptoData: [],
          isRateLimited: rateLimitHit,
        },
        revalidate: 300,
      };
    }
  } catch (error) {
    console.error('CoinGecko fetch failed', error);
    return {
      props: {
        cryptoData: [],
        isRateLimited: true,
      },
      revalidate: 300,
    };
  }
}

export default kursy;
