import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import Link from "next/link";

function MoreFeatured({ posts }) {
  console.log(posts);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {posts &&
            posts
              .slice(-6)
              .reverse()
              .map((post) => (
                <Link href={`/post/${post.node.slug}`}>
                  <div className={styles.moreCard} key={post.node.id}>
                    <div className={styles.moreImg}>
                      <div className={styles.imgWrapper}>
                        <Image
                          src={post.node.featuredImage.url}
                          objectFit="cover"
                          width="100%"
                          height="100%"
                          layout="responsive"
                        />
                      </div>
                      <div className={styles.feature}>
                        <h4>{post.node.categories[0].name}</h4>
                        <h5>{post.node.title}</h5>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
}

export default MoreFeatured;
