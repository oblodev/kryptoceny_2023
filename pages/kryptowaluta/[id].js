import KryptowalutaDetail from "../../components/KryptowalutaDetail";
import PriceTicker from "../../components/PriceTicker";
import styles from "../../styles/kryptowaluta.module.scss";

function kryptowaluta({ data }) {
  return (
    <div className={styles.container}>
      <KryptowalutaDetail krypto={data} />
      <PriceTicker />
    </div>
  );
}

export default kryptowaluta;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=true`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

//export async function getStaticPaths() {
//  const res = await fetch(
//    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
//  );
//  const data = await res.json();

//  const paths = data.map((kryptowaluta) => {
//    return {
//      params: { id: kryptowaluta.id },
//    };
//  });

//  return {
//    paths,
//    fallback: "blocking",
//  };
//}
