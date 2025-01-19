import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import Link from "next/link";

function MoreFeatured({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <p className={styles.noPosts}>Brak dostępnych postów.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {posts
          .slice(-6)
          .reverse()
          .map((post) => (
            <Link href={`/post/${post.node.slug}`} key={post.node.id} passHref>
              <article className={styles.moreCard} aria-label={post.node.title}>
                <div className={styles.moreImg}>
                  <div className={styles.imgWrapper}>
                    <Image
                      src={post.node.featuredImage.url}
                      objectFit="cover"
                      layout="responsive"
                      width={600} // Set fixed dimensions for better responsiveness
                      height={400}
                      alt={post.node.title || "Post image"}
                    />
                  </div>
                  <div className={styles.feature}>
                    <h4>{post.node.categories[0]?.name || "Kategoria"}</h4>
                    <h5>{post.node.title}</h5>
                  </div>
                </div>
              </article>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default MoreFeatured;
