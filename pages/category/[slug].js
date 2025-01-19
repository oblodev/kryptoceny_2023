import styles from "../styles/Poradnik.module.scss";
import Image from "next/image";
import Link from "next/link";

function Poradnik({ poradnikPosts }) {
  if (!poradnikPosts || poradnikPosts.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2>Poradnik</h2>
          </div>
          <p className={styles.noPosts}>Brak dostępnych poradników.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Poradnik</h2>
        </div>
        <div className={styles.poradnikWrap}>
          {poradnikPosts
            .slice(-3)
            .reverse()
            .map((poradnikPost) => (
              <Link
                href={`/poradnik/${poradnikPost.node.slug}`}
                key={poradnikPost.id}
                passHref
              >
                <article
                  className={styles.poradnikCard}
                  aria-label={poradnikPost.node.title}
                >
                  <div className={styles.poradnikImg}>
                    <Image
                      src={poradnikPost.node.poradnikImage.url}
                      width={400}
                      height={280}
                      objectFit="cover"
                      alt={poradnikPost.node.title || "Poradnik obraz"}
                    />
                  </div>
                  <div className={styles.poradnikHeader}>
                    <h3>{poradnikPost.node.title}</h3>
                  </div>
                </article>
              </Link>
            ))}
        </div>
        <Link href="/poradnik/all" passHref>
          <button className={styles.button}>Zobacz więcej</button>
        </Link>
      </div>
    </div>
  );
}

export default Poradnik;
