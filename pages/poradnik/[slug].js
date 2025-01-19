import styles from "../../styles/poradnikDetails.module.scss";
import PoradnikDetail from "../../components/PoradnikDetail";

import {
  getPoradnikDetails,
  getPoradnikPosts,
} from "../../services/poradnikPostsIndex";
import PriceTicker from "../../components/PriceTicker";
import Head from "next/head";

function poradnikDetails({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        {/* Page Title */}
        <title>{data.title} | Poradnik Krypto - KryptoCeny.pl</title>
        <meta
          name="description"
          content={`Poznaj szczegóły poradnika: ${data.title}. ${data.excerpt}`}
        />
        <meta
          name="keywords"
          content={`Poradnik Krypto, ${data.title}, Kryptowaluty, Bitcoin, Ethereum, Altcoin`}
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={data.title} />
        <meta
          property="og:description"
          content={`Poznaj szczegóły poradnika: ${data.title}. ${data.excerpt}`}
        />
        <meta property="og:image" content={data.poradnikImage.url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.kryptoceny.pl/poradnik/${data.slug}`} />
        
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kryptokurs" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={data.poradnikImage.url} />

        {/* Canonical Link */}
        <link
          rel="canonical"
          href={`https://www.kryptoceny.pl/poradnik/${data.slug}`}
        />
      </Head>
      <PoradnikDetail poradnik={data} />
      <PriceTicker />
    </div>
  );
}

export default poradnikDetails;

export async function getStaticProps({ params }) {
  const data = await getPoradnikDetails(params.slug);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const poradniks = await getPoradnikPosts();

  return {
    paths: poradniks.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
