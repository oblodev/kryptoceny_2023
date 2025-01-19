import React from "react";
import Head from "next/head";

import {
  getFeaturedPost,
  getFeaturedPostDetails,
} from "../../services/featuredPostIndex";

import styles from "../../styles/FeaturedPostDetails.module.scss";
import FeaturedPostDetail from "../../components/FeaturedPostDetail";
import PriceTicker from "../../components/PriceTicker";

function FeaturedPostDetails({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        {/* Basic Metadata */}
        <title>{`${data.title} | KryptoCeny.pl - Aktualności`}</title>
        <meta
          name="description"
          content={`Przeczytaj najnowszy artykuł: "${data.title}". Zobacz szczegóły, analizy i opinie na temat kryptowalut.`}
        />
        <meta name="keywords" content={`${data.category}, kryptowaluty, analiza kryptowalut, wiadomości kryptowalut`} />

        {/* Open Graph Metadata */}
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.excerpt} />
        <meta property="og:image" content={data.featuredImage.url} />
        <meta property="og:url" content={`https://www.kryptoceny.pl/featured/${data.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="KryptoCeny" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kryptokurs" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={data.featuredImage.url} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.kryptoceny.pl/featured/${data.slug}`} />
      </Head>

      <FeaturedPostDetail post={data} />
      <PriceTicker />
    </div>
  );
}

export default FeaturedPostDetails;

export async function getStaticProps({ params }) {
  const data = await getFeaturedPostDetails(params.slug);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getFeaturedPost();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
