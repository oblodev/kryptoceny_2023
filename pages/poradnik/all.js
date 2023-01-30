import { getPoradnikPosts } from "../../services/poradnikPostsIndex";
import styles from "../../styles/poradnikAll.module.scss";
import moment from "moment";
import Link from "next/link";

const PoradnikAll = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Poradnik Krypto</h1>
        </div>
        <div className={styles.postWrap}>
          {data &&
            data.reverse().map((post) => (
              <Link href={`/poradnik/${post.node.slug}`} key={post.node.slug}>
                <div className={styles.postCard}>
                  <div className={styles.postImage}>
                    <img src={post.node.poradnikImage.url} />
                  </div>
                  <div className={styles.postHeader}>
                    <h2>{post.node.title}</h2>
                  </div>
                  <div className={styles.postText}>
                    <p>{post.node.excerpt}</p>
                  </div>
                  <div className={styles.postInfo}>
                    <p>{moment(post.node.createdAt).format("DD.MM.YYYY")}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default PoradnikAll;

export async function getStaticProps() {
  const data = await getPoradnikPosts();

  return {
    props: {
      data,
    },
  };
}
