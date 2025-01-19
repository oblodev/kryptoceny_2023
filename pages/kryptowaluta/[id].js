import KryptowalutaDetail from "../../components/KryptowalutaDetail";
import PriceTicker from "../../components/PriceTicker";
import Head from "next/head"; // Importing Head for metadata
import styles from "../../styles/kryptowaluta.module.scss";

function kryptowaluta({ data }) {
  return (
    <div className={styles.container}>
      {/* SEO Meta Tags */}
      <Head>
        <title>{`Aktualny Kurs ${data.name} (${data.symbol.toUpperCase()}) | Kryptowaluty`}</title>
        <meta
          name="description"
          content={`Zobacz aktualny kurs ${data.name} (${data.symbol.toUpperCase()}) oraz dane dotyczące zmian ceny w ciągu 24 godzin, 7 dni, i więcej. Sprawdź kapitalizację rynkową oraz wolumen handlowy.`}
        />
        <meta name="keywords" content={`${data.name}, ${data.symbol}, kurs kryptowalut, kryptowaluty, analiza kryptowalut`} />
        <meta property="og:title" content={`Aktualny Kurs ${data.name} (${data.symbol.toUpperCase()})`} />
        <meta property="og:description" content={`Dowiedz się więcej o ${data.name}, jego kapitalizacji rynkowej, obrocie i zmianach cen.`} />
        <meta property="og:image" content={data.image.large} />
        <meta property="og:url" content={`https://www.kryptoceny.pl/kryptowaluta/${data.id}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Aktualny Kurs ${data.name} (${data.symbol.toUpperCase()})`} />
        <meta name="twitter:description" content={`Zobacz szczegóły dotyczące ${data.name} - kurs, zmiany cenowe, kapitalizacja rynkowa i więcej.`} />
        <meta name="twitter:image" content={data.image.large} />
        <link rel="canonical" href={`https://www.kryptoceny.pl/kryptowaluta/${data.id}`} />
      </Head>

      {/* Page Content */}
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
