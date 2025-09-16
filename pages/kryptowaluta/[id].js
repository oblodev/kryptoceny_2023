import KryptowalutaDetail from "../../components/KryptowalutaDetail";
import PriceTicker from "../../components/PriceTicker";
import Head from "next/head"; // Importing Head for metadata
import styles from "../../styles/kryptowaluta.module.scss";

function kryptowaluta({ data }) {
  const coinName = data?.name || "Kryptowaluta";
  const coinSymbol = data?.symbol ? data.symbol.toUpperCase() : "";
  const coinImage = data?.image?.large || "";
  const coinId = data?.id || "kryptowaluta";

  return (
    <div className={styles.container}>
      {/* SEO Meta Tags */}
      <Head>
        <title>{`Aktualny Kurs ${coinName}${coinSymbol ? ` (${coinSymbol})` : ''} | Kryptowaluty`}</title>
        <meta
          name="description"
          content={`Zobacz aktualny kurs ${coinName}${coinSymbol ? ` (${coinSymbol})` : ''} oraz dane dotyczące zmian ceny w ciągu 24 godzin, 7 dni, i więcej. Sprawdź kapitalizację rynkową oraz wolumen handlowy.`}
        />
        <meta name="keywords" content={`${coinName}, ${coinSymbol}, kurs kryptowalut, kryptowaluty, analiza kryptowalut`} />
        <meta property="og:title" content={`Aktualny Kurs ${coinName}${coinSymbol ? ` (${coinSymbol})` : ''}`} />
        <meta property="og:description" content={`Dowiedz się więcej o ${coinName}, jego kapitalizacji rynkowej, obrocie i zmianach cen.`} />
        <meta property="og:image" content={coinImage} />
        <meta property="og:url" content={`https://www.kryptoceny.pl/kryptowaluta/${coinId}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Aktualny Kurs ${coinName}${coinSymbol ? ` (${coinSymbol})` : ''}`} />
        <meta name="twitter:description" content={`Zobacz szczegóły dotyczące ${coinName} - kurs, zmiany cenowe, kapitalizacja rynkowa i więcej.`} />
        <meta name="twitter:image" content={coinImage} />
        <link rel="canonical" href={`https://www.kryptoceny.pl/kryptowaluta/${coinId}`} />
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

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=false&sparkline=true`
    );

    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    if (!data || data.error || !data.symbol) {
      return { notFound: true };
    }

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
