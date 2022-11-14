import KryptowalutaDetail from "../../components/KryptowalutaDetail";
import styles from "../../styles/kryptowaluta.module.scss";

function kryptowaluta({ data }) {
  return (
    <div className={styles.container}>
      <KryptowalutaDetail krypto={data} />
    </div>
  );
}

export default kryptowaluta;

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=true`
  );
  const data = await res.json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  const data = await res.json();

  const paths = data.map((kryptowaluta) => {
    return {
      params: { id: kryptowaluta.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
