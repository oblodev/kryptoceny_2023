import React from "react";

import {
  getFeaturedPost,
  getFeaturedPostDetails,
} from "../../services/featuredPostIndex";

import styles from "../../styles/FeaturedPostDetails.module.scss";
import FeaturedPostDetail from "../../components/FeaturedPostDetail";

function FeaturedPostDetails({ data }) {
  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kryptokurs" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={data.featuredImage.url} />
      </Head>
      <FeaturedPostDetail post={data} />
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
