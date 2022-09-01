import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";
import Link from "next/link";

function MoreFeatured({ posts }) {
  console.log(posts);
  console.log(posts[0].node.categories.name);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {posts &&
            posts.slice(-6).map((post) => (
              <Link href={`/post/${post.node.slug}`}>
                <div className={styles.moreCard}>
                  <div className={styles.moreImg}>
                    <div
                      className={styles.imgWrapper}
                      style={{
                        width: "400px",
                        height: "300px",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={post.node.featuredImage.url}
                        objectFit="cover"
                        width="400px"
                        height="300px"
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
