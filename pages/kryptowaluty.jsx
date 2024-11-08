import styles from "../styles/kryptowaluty2.module.scss";
import {
  getKryptowaluty,
  getKryptowalutyDetails,
} from "../services/kryptoInfoData";
import Link from "next/link";
import PriceTicker from "../components/PriceTicker";
import Head from "next/head";

function kryptowaluty({ data }) {
  return (
    <>
      <Head>
        <title>Kryptoceny.pl - Informacje i Aktualności</title>
        <meta
          name="description"
          content="Uzyskaj najnowsze informacje o kryptowalutach, aktualizacje cen, wiadomości oraz analizy."
        />
        <meta
          name="keywords"
          content="kryptowaluty, Bitcoin, Ethereum, informacje, kursy, cena kryptowalut"
        />
        <meta
          property="og:title"
          content="Kryptowaluty - Informacje i Aktualności"
        />
        <meta
          property="og:description"
          content="Poznaj aktualne informacje o kryptowalutach, kursy oraz wiadomości."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kryptoceny.pl/kryptowaluty" />
      </Head>

      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>Kryptowaluty Informacje</h1>
          </div>
          <div className={styles.kryptoWrap}>
            {data &&
              data.map((krypto) => (
                <div className={styles.kryptoCard} key={krypto.cursor}>
                  <div className={styles.kryptoCardHeader}>
                    <h2>{krypto.node.title}</h2>
                    <img
                      src={krypto.node.kryptoImage.url}
                      alt={`${krypto.node.title} logo`}
                    />
                  </div>
                  <div className={styles.kryptoCardInfo}>
                    <p>{krypto.node.desc}</p>
                    <Link href={`/kryptoinfo/${krypto.node.slug}`}>
                      <button>Dowiedz sie wiecej o {krypto.node.title}</button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <PriceTicker />
      </div>
    </>
  );
}

export default kryptowaluty;

export async function getStaticProps() {
  const data = await getKryptowaluty();

  return {
    props: {
      data,
    },
  };
}
