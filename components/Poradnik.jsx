import styles from "../styles/Poradnik.module.scss";
import Image from "next/image";
import Link from "next/link";

function Poradnik({ poradnikPosts }) {
  console.log(poradnikPosts);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Poradnik Krypto</h2>
        <div className={styles.poradnikWrap}>
          {poradnikPosts &&
            poradnikPosts.slice(-3).map((poradnikPost) => (
              <div className={styles.poradnikCard}>
                <div className={styles.poradnikImg}>
                  <Image
                    src={poradnikPost.node.poradnikImage.url}
                    width="400px"
                    height="280px"
                  />
                </div>
                <div className={styles.poradnikHeader}>
                  <Link href={`/poradnik/${poradnikPost.node.slug}`}>
                    <h3>{poradnikPost.node.title}</h3>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Poradnik;
