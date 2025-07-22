import styles from "../styles/Poradnik.module.scss";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// This is a much cleaner and more maintainable card structure.
function PoradnikCard({ post }) {
  return (
    <Link href={`/poradnik/${post.node.slug}`} passHref>
      <a className={styles.poradnikCard}>
        <div className={styles.cardImage}>
          <Image
            src={post.node.poradnikImage.url}
            layout="fill"
            objectFit="cover"
            alt={post.node.title}
          />
        </div>
        <div className={styles.cardContent}>
          <h3>{post.node.title}</h3>
        </div>
      </a>
    </Link>
  );
}

function Poradnik({ poradnikPosts }) {
  return (
    <section className={styles.container} aria-labelledby="poradnik-heading">
      <div className={styles.header}>
        <h2 id="poradnik-heading">Poradnik</h2>
        <p>Przeczytaj nasze najnowsze artykuły i poszerz swoją wiedzę.</p>
      </div>

      <motion.div
        className={styles.poradnikGrid}
        whileInView={{ y: [30, 0], opacity: [0, 1] }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {poradnikPosts &&
          poradnikPosts
            .slice(0, 3) // Simpler to take the first 3
            .map((poradnikPost) => (
              <PoradnikCard key={poradnikPost.node.id} post={poradnikPost} />
            ))}
      </motion.div>

      <div className={styles.buttonContainer}>
        <Link href="/poradnik/all" passHref>
          <a className={styles.viewMoreButton}>Zobacz wszystkie artykuły</a>
        </Link>
      </div>
    </section>
  );
}

export default Poradnik;