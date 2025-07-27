import { getCategories, getCategoryPost } from "../../services";
import styles from "../../styles/category.module.scss";
import moment from "moment";
import 'moment/locale/pl'; // Import Polish locale for moment
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component

// A clean, reusable card component for each post
function PostCard({ post }) {
  const { title, slug, featuredImage, excerpt, createdAt } = post.node;

  return (
    <Link href={`/post/${slug}`} passHref>
      <a className={styles.postCardLink}>
        <article className={styles.postCard}>
          <div className={styles.cardImage}>
            <Image
              src={featuredImage.url}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.cardContent}>
            <h2>{title}</h2>
            <p className={styles.excerpt}>{excerpt}</p>
            <div className={styles.cardFooter}>
              <span>{moment(createdAt).format("DD MMMM YYYY")}</span>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
}

const CategoryPost = ({ posts }) => {
  // A safer way to get the category name, with a fallback
  const categoryName = posts?.[0]?.node.categories[0]?.name || 'Artykuły';

  if (!posts || posts.length === 0) {
    return (
      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Brak postów w tej kategorii</h1>
          <p className={styles.subtitle}>
            Sprawdź inne kategorie lub wróć później!
          </p>
        </header>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Kategoria: {categoryName}</h1>
      </header>
      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <PostCard post={post} key={post.node.slug} />
        ))}
      </div>
    </main>
  );
};

export default CategoryPost;

// --- Data Fetching (No changes needed here, it's already well-structured) ---

export async function getStaticProps({ params }) {
  const posts = (await getCategoryPost(params.slug)) || [];
  return {
    props: { posts: posts },
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}