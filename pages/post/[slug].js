import React from "react";
import Image from "next/image";

import { getPosts, getPostDetails } from "../../services";

import styles from "../../styles/PostDetails.module.scss";
import PostDetail from "../../components/PostDetail";

function PostDetails({ data }) {
  console.log(data);

  return (
    <div className={styles.container}>
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
