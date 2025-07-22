import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import Link from "next/link";
import BitpandaBanner from "../components/BitpandaBanner";

// A cleaner, self-contained card component
function ArticleCard({ post }) {
  const { title, slug, featuredImage, categories } = post.node;

  return (
    <Link href={`/post/${slug}`} passHref>
      <a className={styles.articleCard} aria-label={title}>
        <article>
          <div className={styles.cardImage}>
            <Image
              src={featuredImage.url}
              alt={title || "Post image"}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.cardContent}>
            <span className={styles.categoryTag}>
              {categories[0]?.name || "Kategoria"}
            </span>
            <h3>{title}</h3>
          </div>
        </article>
      </a>
    </Link>
  );
}

function MoreFeatured({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <section className={styles.container}>
        <p className={styles.noPosts}>Brak dostępnych postów.</p>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Polecane Artykuły</h2>
      </header>
      <div className={styles.articlesGrid}>
        {posts
          .slice(-9) // Use -9 to get the LAST 9 items (the newest)
          .reverse() // Then reverse them to show the absolute newest first
          .map((post) => (
            <ArticleCard post={post} key={post.node.id} />
          ))}
      </div>
      <BitpandaBanner />
    </section>
  );
}

export default MoreFeatured;