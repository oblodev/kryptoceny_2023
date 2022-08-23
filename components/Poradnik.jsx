import styles from "../styles/Poradnik.module.scss";
import Image from "next/image";
import placeholder from "../public/images/placeholder.jpg";

function Poradnik() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Poradnik Krypto</h2>
        <div className={styles.poradnikWrap}>
          <div className={styles.poradnikCard}>
            <div className={styles.poradnikImg}>
              <Image src={placeholder} width="620px" height="480px" />
            </div>
            <div className={styles.poradnikHeader}>
              <h3>Co to jest Airdrop?</h3>
            </div>
          </div>
          <div className={styles.poradnikCard}>
            <div className={styles.poradnikImg}>
              <Image src={placeholder} width="620px" height="480px" />
            </div>
            <div className={styles.poradnikHeader}>
              <h3>Co to jest Airdrop?</h3>
            </div>
          </div>
          <div className={styles.poradnikCard}>
            <div className={styles.poradnikImg}>
              <Image src={placeholder} width="660px" height="480px" />
            </div>
            <div className={styles.poradnikHeader}>
              <h3>Co to jest Airdrop?</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poradnik;
