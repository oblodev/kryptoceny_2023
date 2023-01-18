import styles from "../styles/kryptowaluty2.module.scss";
import {
  getKryptowaluty,
  getKryptowalutyDetails,
} from "../services/kryptoInfoData";
import Link from "next/link";

function kryptowaluty({ data }) {
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Kryptowaluty Informacje</h1>
        </div>
        <div className={styles.kryptoWrap}>
          {data &&
            data.map((krypto) => (
              <div className={styles.kryptoCard} key={krypto.cursor}>
                <div className={styles.kryptoCardHeader}>
                  <h2>{krypto.node.title}</h2>
                  <img src={krypto.node.kryptoImage.url} alt="krypto-logo" />
                </div>
                <div className={styles.kryptoCardInfo}>
                  <p>{krypto.node.desc}</p>
                  <Link href={`/kryptoinfo/${krypto.node.slug}`}>
                    <button>Dowiedz sie wiecej ...</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default kryptowaluty;

export async function getStaticProps() {
  const data = await getKryptowaluty();

  return {
    props: {
      data,
    },
  };
}
