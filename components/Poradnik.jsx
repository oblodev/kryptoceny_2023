import styles from "../styles/Poradnik.module.scss";
import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";

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
                    width="600px"
                    height="480px"
                    borderRadius="20px"
                  />
                </div>
                <div className={styles.poradnikHeader}>
                  <h3>{poradnikPost.node.title}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Poradnik;
