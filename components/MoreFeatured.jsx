import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";

function MoreFeatured({ posts }) {
  console.log(posts);
  console.log(posts[0].node.categories.name);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {posts &&
          posts.slice(-6).map((post) => (
            <div className={styles.moreCard}>
              <h4>{post.node.categories[0].name}</h4>
              <div className={styles.moreImg}>
                <Image
                  src={post.node.featuredImage.url}
                  objectFit="cover"
                  height="507px"
                  width="750px"
                />
              </div>

              <h5>{post.node.title}</h5>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MoreFeatured;
