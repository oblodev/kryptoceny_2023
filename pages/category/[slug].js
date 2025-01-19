import { getCategories, getCategoryPost } from "../../services";
import styles from "../../styles/category.module.scss";
import moment from "moment";
import Link from "next/link";

const CategoryPost = ({ posts }) => {
  // console.log(posts[0].node.categories[0].name);
  // console.log(posts.map((post) => post.node.categories[0].name));
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {/* <h1>Kategoria: {posts[0].node.categories[0].name}</h1> */}
        </div>
        <div className={styles.postWrap}>
          {posts &&
            posts.reverse().map((post) => (
              <Link href={`/post/${post.node.slug}`} key={post.node.slug}>
                <div className={styles.postCard}>
                  <div className={styles.postImage}>
                    <img src={post.node.featuredImage.url} />
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
export default CategoryPost;

export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
