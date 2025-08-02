import { useState } from 'react'; // <--- 1. IMPORT useState
import styles from "../styles/MoreFeatured.module.scss";
import Image from "next/image";
import Link from "next/link";
import BitpandaBanner from "../components/BitpandaBanner";
import { FaStar } from "react-icons/fa";

// A cleaner, self-contained card component
function ArticleCard({ post }) {
  const { title, slug, featuredImage, categories } = post.node;
  // 2. INITIALIZE the state inside the component
  const [loading, setLoading] = useState(true);

  return (
    <Link href={`/post/${slug}`} passHref>
      <a className={styles.articleCard} aria-label={title}>
        <article>
          <div className={styles.cardImage}>
            {/* You can optionally add a loading skeleton here based on the 'loading' state */}
            {loading && <div className={styles.imagePlaceholder} />}
            <Image
              src={post.node.featuredImage.url}
              layout="fill"
              objectFit="cover"
              alt={title}
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              // 3. THIS WILL NOW WORK
              onLoadingComplete={() => setLoading(false)}
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

// No changes needed in the MoreFeatured component
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
        <FaStar className={styles.icon} />
        <h2>Polecane Artykuły</h2>
      </header>
      <div className={styles.articlesGrid}>
        {posts
          .slice(-9)
          .reverse()
          .map((post) => (
            <ArticleCard post={post} key={post.node.id} />
          ))}
      </div>
      <BitpandaBanner />
    </section>
  );
}

export default MoreFeatured;