import React from "react";
import Head from "next/head";
import { getPosts, getPostDetails } from "../../services";
import styles from "../../styles/PostDetails.module.scss";
import PostDetail from "../../components/PostDetail";

function PostDetails({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        {/* Dynamic Meta Tags for SEO */}
        <title>{data.title} | Kryptowalutowe Wiadomości</title>
        <meta
          name="description"
          content={`Przeczytaj artykuł: ${data.title}. Dowiedz się więcej o ${data.categories[0].name}. ${data.excerpt}`}
        />
        <meta
          name="keywords"
          content={`kryptowaluty, ${data.categories[0].name}, ${data.title}, bitcoin, ethereum`}
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={data.title} />
        <meta
          property="og:description"
          content={`Przeczytaj artykuł: ${data.title}. ${data.excerpt}`}
        />
        <meta property="og:image" content={data.featuredImage.url} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.kryptoceny.pl/post/${data.slug}`}
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kryptokurs" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={data.featuredImage.url} />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`https://www.kryptoceny.pl/post/${data.slug}`}
        />
      </Head>
      <PostDetail post={data} />
    </div>
  );
}

export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}
