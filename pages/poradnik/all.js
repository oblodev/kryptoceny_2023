// pages/poradnik/all.js (assuming this is the file path)

import { getPoradnikPosts } from "../../services/poradnikPostsIndex";
import styles from "../../styles/poradnikAll.module.scss";
import moment from "moment";
import 'moment/locale/pl';
import Link from "next/link";
import Image from "next/image";

// Reusable card component, consistent with other pages
function PostCard({ post }) {
  const { title, slug, poradnikImage, excerpt, createdAt } = post.node;
  
  return (
    <Link href={`/poradnik/${slug}`} passHref>
      <a className={styles.postCardLink}>
        <article className={styles.postCard}>
          <div className={styles.cardImage}>
            <Image
              src={poradnikImage.url}
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

const PoradnikAll = ({ posts }) => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Poradnik Krypto</h1>
        <p className={styles.subtitle}>
          Praktyczne informacje, porady oraz odpowiedzi na najczęstsze pytania
          dotyczące świata kryptowalut. Niezależnie od tego, czy jesteś
          początkującym, czy doświadczonym traderem.
        </p>
      </header>

      <div className={styles.postsGrid}>
        {posts.map((post) => (
          <PostCard post={post} key={post.node.slug} />
        ))}
      </div>

      <footer className={styles.footer}>
        <p>
          Chcesz dowiedzieć się więcej? Regularnie publikujemy nowe treści, które
          pomogą Ci zdobyć wiedzę i umiejętności niezbędne do odniesienia sukcesu
          w świecie kryptowalut.
        </p>
      </footer>
    </main>
  );
};

export default PoradnikAll;

export async function getStaticProps() {
  const data = await getPoradnikPosts() || []; // Default to an empty array if the API returns nothing
  
  return {
    props: {
      posts: data.reverse(), // Ensure the prop is named 'posts'
    },
  };
}