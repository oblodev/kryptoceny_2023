import styles from "../styles/Featured.module.scss";
import Image from "next/image";
import blockchain from "../public/images/blockchain.jpg";

function Featured() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>
          <span>//</span> Aktualnosci ze swiata krpytowalut
        </h2>
        <div className={styles.featured}>
          <div className={styles.imgWrapper}>
            <Image
              src={blockchain}
              className={styles.img}
              width="1200px"
              height="700px"
              objectFit="cover"
            />
          </div>
          <div className={styles.feature}>
            <p>BLOCKCHAIN</p>
            <h3>
              Do 2024 roku wydatki na rozwiazania blockchain moga wyniesc 19
              milliardow dolarow.
            </h3>
            <p>27 Marca 2022</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
