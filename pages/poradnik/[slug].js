import styles from "../../styles/poradnikDetails.module.scss";
import PoradnikDetail from "../../components/PoradnikDetail";

import {
  getPoradnikDetails,
  getPoradnikPosts,
} from "../../services/poradnikPostsIndex";

function poradnikDetails({ data }) {
  console.log(data);
  return (
    <div className={styles.container}>
      <PoradnikDetail poradnik={data} />
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
