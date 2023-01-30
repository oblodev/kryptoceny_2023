import styles from "../styles/Poradnik.module.scss";
import Image from "next/image";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io";
import { Button } from "react-bootstrap";

function Poradnik({ poradnikPosts }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2>Poradnik</h2>
        </div>
        <div className={styles.poradnikWrap}>
          {poradnikPosts &&
            poradnikPosts
              .slice(-3)
              .reverse()
              .map((poradnikPost) => (
                <Link
                  href={`/poradnik/${poradnikPost.node.slug}`}
                  key={poradnikPost.id}
                >
                  <div className={styles.poradnikCard}>
                    <div className={styles.poradnikImg}>
                      <Image
                        src={poradnikPost.node.poradnikImage.url}
                        width="400px"
                        height="280px"
                        objectFit="cover"
                        alt="poradnik-image"
                      />
                    </div>
                    <div className={styles.poradnikHeader}>
                      <h3>{poradnikPost.node.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
        </div>

        <Link href="/poradnik/all">
          <button className={styles.button}>Zobacz więcej</button>
        </Link>
      </div>
    </div>
  );
}

export default Poradnik;
