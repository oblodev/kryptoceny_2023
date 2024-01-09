import React from "react";
import Head from "next/head";

import { getPosts, getPostDetails } from "../../services";

import styles from "../../styles/PostDetails.module.scss";
import PostDetail from "../../components/PostDetail";

function PostDetails({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kryptokurs" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.excerpt} />
        <meta name="twitter:image" content={data.featuredImage.url} />
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
