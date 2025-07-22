
import styles from "../styles/kryptowaluty.module.scss";
import Link from "next/link";
import Image from "next/image";
import PriceTicker from "../components/PriceTicker";
import Head from "next/head";
import { getKryptowaluty } from "../services/kryptoInfoData"; // Add this line

// Reusable Article Card Component
function ArticleCard({ krypto }) {
  const { title, slug, kryptoImage, desc } = krypto.node;
  
  return (
    <article className={styles.articleCard}>
      <Link href={`/kryptoinfo/${slug}`} passHref>
        <a className={styles.cardLink}>
          <div className={styles.cardImage}>
            <Image
              src={kryptoImage.url}
              alt={`${title} logo`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.cardContent}>
            <h2>{title}</h2>
            <p>{desc}</p>
            <span className={styles.readMore}>Dowiedz się więcej &rarr;</span>
          </div>
        </a>
      </Link>
    </article>
  );
}

function Kryptowaluty({ data }) {
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

      <main className={styles.container}>
        <header className={styles.hero}>
          <h1>Informacje o Kryptowalutach</h1>
          <p className={styles.subtitle}>
            Poznaj podstawy najpopularniejszych kryptowalut na rynku.
          </p>
        </header>

        <div className={styles.articlesGrid}>
          {data &&
            data.map((krypto) => (
              <ArticleCard krypto={krypto} key={krypto.cursor} />
            ))}
        </div>
      </main>

      <PriceTicker />
    </>
  );
}

export default Kryptowaluty;

export async function getStaticProps() {
  const data = await getKryptowaluty();
  return {
    props: { data },
  };
}